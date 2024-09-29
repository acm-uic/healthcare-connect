import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  savedServices: string[];
  language: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    savedServices: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const User: Model<IUser> = mongoose.model('User', UserSchema);