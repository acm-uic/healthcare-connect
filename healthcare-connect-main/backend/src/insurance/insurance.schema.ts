import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IInsurancePlan extends Document {
  name: string;
  description: string;
  monthlyPremium: number;
  coverageDetails: string;
  eligibility: string;
}

const InsurancePlanSchema = new Schema<IInsurancePlan>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    monthlyPremium: { type: Number, required: true },
    coverageDetails: { type: String, required: true },
    eligibility: { type: String, required: true },
  },
  { timestamps: true }
);

export const InsurancePlan: Model<IInsurancePlan> = mongoose.model('InsurancePlan', InsurancePlanSchema);
