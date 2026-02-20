import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

export interface IUser extends Document {
  username: string;
  email: string;
  password: any;
  createdAt: Date;
  picture: string;
  lastMessage: string;
  lastMessageCount: Number;
  isOnline: Boolean;
  unread: any[];
  token: string;
  otp: string;
  expireAt: Date;
  resetPasswordToken: string;
  resetPasswordExpires: Date;
  google: any;
  image: string;
  phone: string;
  birthday: string;
  gender: string;
  backgroundImage: string;
  address: string;
  occupation: string;
  videoId?: mongoose.Types.ObjectId;
  backgroundImageId?: mongoose.Types.ObjectId;
  backgroundPlaceholderId?: mongoose.Types.ObjectId;
}

const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: false, default: 'Anonymous User' },
  email: { type: String, required: false, validate: validator.isEmail },
  videoId: { type: mongoose.Schema.Types.ObjectId, required: false },
  backgroundImageId: { type: mongoose.Schema.Types.ObjectId, required: false },
  backgroundPlaceholderId: { type: mongoose.Schema.Types.ObjectId, required: false },
  password: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  picture: { type: String, required: false, default: '' },
  image: { type: String, required: false, default: '' },
  birthday: { type: String, required: false, default: '' },
  occupation: { type: String, required: false, default: '' },
  address: { type: String, required: false, default: '' },
  gender: { type: String, required: false, default: 'Male' },
  phone: { type: String, required: false, default: '' },
  lastMessage: { type: String, required: false, default: '' },
  lastMessageCount: { type: Number, required: false, default: 0 },
  backgroundImage: { type: String, required: false, default: '' },
  isOnline: { type: Boolean, required: false, default: null },
  unread: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UnreadMsg' }],
  token: { type: String, required: false },
  otp: {
    type: String,
    default: 'otp'
    // required: true,
  },
  expireAt: {
    type: Date,
    default: () => new Date(Date.now() + 300 * 1000) // Set to 5 minutes from now
  },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  google: {
    name: { type: String, required: false },
    email: { type: String, required: false, validate: validator.isEmail },
    accessToken: { type: String, required: false }
  }
});

// Pre-save hook to hash the password before saving the user
userSchema.pre('save', async function (next: any) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to check if entered password matches the hashed password
userSchema.methods.comparePassword = async function (enteredPassword: any) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Ensure unique email index
userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
