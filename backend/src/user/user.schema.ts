import mongoose, { Schema, Document, Model } from 'mongoose';
import { IInsurancePlan } from '../insurance/insurance.schema';
import { IService } from 'src/services/service.schema';
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  stripeCustomerId?: string;
  savedInsurancePlans: IInsurancePlan['_id'][];
  savedServices: IService['_id'][];
  comparePassword(candidatePassword: string): Promise<boolean>;
  SignAccessToken: () => string;
  SignRefreshToken: () => string;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    stripeCustomerId: { type: String, default: null },
    savedInsurancePlans: [{ type: Schema.Types.ObjectId, ref: 'InsurancePlan' }],
    savedServices: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
  },
  { timestamps: true }
);

UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.SignAccessToken = function(){
  return jwt.sign({id: this._id}, process.env.ACCESS_TOKEN as string)

};

UserSchema.methods.SignRefreshToken = function() {
  return jwt.sign({id: this._id}, process.env.REFRESH_TOKEN as string)
};

UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User: Model<IUser> = mongoose.model('User', UserSchema);