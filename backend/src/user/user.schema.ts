import mongoose, { Schema, Document, Model } from 'mongoose';
import { IInsurancePlan } from '../insurance/insurance.schema';
import { IService } from 'src/services/service.schema';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  savedInsurancePlans: IInsurancePlan['_id'][];
  savedServices: IService['_id'][];
  language: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    savedInsurancePlans: [{ type: Schema.Types.ObjectId, ref: 'InsurancePlan' }],
    savedServices: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
  },
  { timestamps: true }
);

export const User: Model<IUser> = mongoose.model('User', UserSchema);