import { Injectable } from '@nestjs/common';
import { InsurancePlan } from './insurance.schema';

@Injectable()
export class InsuranceService {

    // async create(insurance: any) {
    //     try {
    //         const newInsurance = new InsurancePlan(insurance);
    //         return await newInsurance.save();
    //     } catch (error: any) {
    //         return error;
    //     }
    // }

}
