// import mongoose from "mongoose"

// export const connectDB = async (uri: string) => {
//   try {
//       const conn = await mongoose.connect(uri);
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (err) {
//     console.error('Error connecting to DB:', err);
//     process.exit(1);
//   }
// };

// src/db.ts
import mongoose from 'mongoose';
import { GridFSBucket, Db } from 'mongodb';
import gridfsStream, { Grid } from 'gridfs-stream';
import dotenv from 'dotenv';

dotenv.config();

export let gfs: Grid | null = null;
export let gridfsBucket: GridFSBucket | null = null;

export const connectDB = async (uri: string): Promise<void> => {
  try {
    const conn = await mongoose.connect(uri);
    const db: any | Db = conn.connection.db;

    // Setup native GridFSBucket
    gridfsBucket = new GridFSBucket(db, { bucketName: 'videos' });

    // Setup GridFS-Stream (deprecated, but works with streams)
    gfs = gridfsStream(db, mongoose.mongo);
    gfs.collection('videos');

    console.log('✅ MongoDB & GridFS initialized');
  } catch (err) {
    console.error('❌ Error connecting to DB:', err);
    process.exit(1);
  }
};
