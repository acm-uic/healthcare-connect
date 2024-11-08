import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IService extends Document {
  name: string;
  description: string;
  cost: number;
  location: string;
  eligibility: string;
  languagesSupported: string[];
  providerId: string;
}

const ServiceSchema = new Schema<IService>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    cost: { type: Number, required: true },
    location: { type: String, required: true },
    eligibility: { type: String, required: true },
    languagesSupported: { type: [String], default: [] },
    providerId: { type: String, required: true }
  },
  { timestamps: true }
);

export const Service: Model<IService> = mongoose.model('Service', ServiceSchema);
