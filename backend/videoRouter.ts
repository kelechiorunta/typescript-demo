import express, { Request, Response, Router } from 'express';
import mongoose from 'mongoose';
import { Db, GridFSBucket, ObjectId } from 'mongodb';
import multer from 'multer';
import NodeCache from 'node-cache';
import { Readable } from 'stream';

import User from './models/User'; // Adjust the path to your User model

const videoRouter: Router = express.Router();
const cache = new NodeCache({ stdTTL: 3600 }); // 1 hour TTL

// Multer in-memory config
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Type for cached video metadata
interface CachedVideoData {
    fileId: ObjectId;
    length: number;
    contentType: string;
  }
  
  videoRouter.get('/videos/:email', async (req: Request, res: Response): Promise<void> => {
    try {
      // Ensure DB is connected
      const db = mongoose.connection.db;
      if (!db) {
        res.status(500).json({ error: 'Database not initialized' });
        return;
      }
  
      const gridfsBucket = new GridFSBucket(db, { bucketName: 'videos' });
  
      const email = req.params.email;
      const range = req.headers.range;
  
      // Use cache if possible
      const cacheKey = `video-${email}`;
      let cachedData = cache.get<CachedVideoData>(cacheKey);
  
      if (!cachedData) {
          const user = await User.findOne({ email });
          console.log("Current user", user?.username)
  
        if (!user || !user.videoId) {
          res.status(404).json({ error: 'User or video not found' });
          return;
        }
  
        const file = await gridfsBucket.find({ _id: user.videoId }).next();
        if (!file) {
          res.status(404).json({ error: 'Video file not found in GridFS' });
          return;
        }
  
        cachedData = {
          fileId: file._id,
          length: file.length,
          contentType: file.contentType || 'video/mp4',
        };
  
        cache.set(cacheKey, cachedData);
      }
  
      const { fileId, length, contentType } = cachedData;
  
      // If Range header is missing, stream entire file
      if (!range) {
        res.set({
          'Content-Length': length.toString(),
          'Content-Type': contentType,
          'Accept-Ranges': 'bytes',
          'Cache-Control': 'public, max-age=3600',
        });
  
        const stream = gridfsBucket.openDownloadStream(fileId);
        stream.pipe(res);
        return;
      }
  
      // Parse Range header: bytes=START-
      const startMatch = range.match(/bytes=(\d+)-?/);
      const start = startMatch ? parseInt(startMatch[1], 10) : 0;
  
      if (isNaN(start) || start >= length) {
        res.status(416).set('Content-Range', `bytes */${length}`).send('Requested range not satisfiable');
        return;
      }
  
      const CHUNK_SIZE = 1_000_000; // 1MB chunk
      const end = Math.min(start + CHUNK_SIZE, length - 1);
      const contentLength = end - start + 1;
  
      res.status(206).set({
        'Content-Range': `bytes ${start}-${end}/${length}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': contentLength.toString(),
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
      });
  
      const partialStream = gridfsBucket.openDownloadStream(fileId, {
        start,
        end: end + 1, // end is exclusive
      });
  
      partialStream.pipe(res);
    } catch (err: unknown) {
      console.error('Error fetching video:', (err as Error).message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  


// POST /upload route
videoRouter.post('/upload', upload.single('video'), async (req: Request, res: Response): Promise<void> => {
    
    try {
        // Ensure DB is connected
      const db = mongoose.connection.db;
      if (!db) {
        res.status(500).json({ error: 'Database not initialized' });
        return;
      }
  
      const gridfsBucket = new GridFSBucket(db, { bucketName: 'videos' });
      if (!req.file || !gridfsBucket) {
        res.status(400).json({ error: 'No file or GridFS not initialized' });
        return;
      }
  
      const readableStream = Readable.from(req.file.buffer);
  
      const uploadStream = gridfsBucket.openUploadStream(req.file.originalname, {
        contentType: req.file.mimetype,
      });
  
      readableStream.pipe(uploadStream)
        .on('error', (err) => {
          console.error('Upload Error:', err);
          res.status(500).json({ error: 'Upload failed' });
        })
        .on('finish', () => {
          res.status(201).json({ message: 'Upload successful', fileId: uploadStream.id });
        });
  
    } catch (err: any) {
      console.error('Upload exception:', err.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

export default videoRouter;

