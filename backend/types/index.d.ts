// types/express/index.d.ts
// types/express/index.d.ts
import { Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: any;
  createdAt: Date;
  picture: string;
  lastMessage: string;
  lastMessageCount: number;
  isOnline: boolean;
  unread: any[];
  token: string;
  otp: string;
  expireAt: Date;
  resetPasswordToken: string;
  resetPasswordExpires: Date;
  google: any;
}

declare global {
  namespace Express {
    interface User extends IUser {}

    interface Request {
      user?: User;
    //   isAuthenticated?: () => boolean | any;
    }
  }
}
