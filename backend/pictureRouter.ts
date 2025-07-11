// RESTful route (TypeScript) for uploading background image and placeholder to GridFS
// routes/picRouter.ts
import express, { Request, Response, Router } from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import sharp from 'sharp';
import { Readable } from 'stream';
import { pipeline } from 'stream/promises';
import path from 'path';
import { GridFSBucket, ObjectId } from 'mongodb';
import User, { IUser } from './models/User'; // Adjust the import to match your file structure

const picRouter: Router = express.Router();
const upload = multer();

// Extend Express' Request to include `file` from Multer
interface MulterRequest extends Request {
  file: Express.Multer.File;
}

picRouter.post('/background/:email', upload.single('picture'), async (req: Request, res: Response): Promise<any> => {
  try {
    const db: any = mongoose.connection.db;
    const gfs = new GridFSBucket(db, { bucketName: 'backgroundImages' });

    const currentUser: IUser | null = await User.findOne({ email: req.params.email });
    if (!currentUser) {
      res.status(400).json({ error: 'No such user' });
      return;
    }

    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      
      const { buffer, originalname, mimetype } = req.file;

    // Remove existing images
    if (currentUser.backgroundImageId) {
      await gfs.delete(new ObjectId(currentUser.backgroundImageId));
    }
    if (currentUser.backgroundPlaceholderId) {
      await gfs.delete(new ObjectId(currentUser.backgroundPlaceholderId));
    }

    // Save full image
    const fullImageStream = gfs.openUploadStream(originalname, { contentType: mimetype });
    const fullReadable = Readable.from(buffer);
    await pipeline(fullReadable, fullImageStream);

    // Generate and save placeholder
    const placeholderBuffer = await sharp(buffer).resize({ width: 20 }).toBuffer();
    const placeholderStream = gfs.openUploadStream(
      `${path.basename(originalname, path.extname(originalname))}-small`,
      { contentType: mimetype }
    );
    const placeholderReadable = Readable.from(placeholderBuffer);
    await pipeline(placeholderReadable, placeholderStream);

    // Update user
    currentUser.backgroundImageId = fullImageStream.id;
    currentUser.backgroundPlaceholderId = placeholderStream.id;
    await currentUser.save();

    res.status(201).json({
      message: 'Background image uploaded',
      backgroundImageId: fullImageStream.id,
      backgroundPlaceholderId: placeholderStream.id,
    });
  } catch (error) {
    console.error('Background upload error:', error);
    res.status(500).json({ error: 'Error uploading background image' });
  }
});

// Serve image from GridFS
picRouter.get('/images/:id', async (req: Request, res: Response): Promise<void> => {
    try {
      const fileId = req.params.id;
  
      if (!ObjectId.isValid(fileId)) {
        res.status(400).json({ error: 'Invalid file ID' });
        return;
      }
  
      const db: any = mongoose.connection.db;
    
      const gfs = new GridFSBucket(db, { bucketName: 'backgroundImages' });
  
      const _id = new ObjectId(fileId);
  
      // Check if file exists
      const files = await gfs.find({ _id }).toArray();
      if (!files || files.length === 0) {
        res.status(404).json({ error: 'File not found' });
        return;
      }
  
      // Stream the image
      res.set('Content-Type', files[0].contentType || 'application/octet-stream');
      const downloadStream = gfs.openDownloadStream(_id);
      downloadStream.pipe(res);
    } catch (err) {
      console.error('Image stream error:', err);
      res.status(500).json({ error: 'Error retrieving image' });
    }
  });

export default picRouter;
