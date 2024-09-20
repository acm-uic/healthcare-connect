import { Injectable } from '@nestjs/common';
import { IInsurancePlan, InsurancePlan } from './insurance.schema';

@Injectable()
export class InsuranceService {

    /**
     * get all the insurance plans
     * @returns InsurancePlan array
     */
    async getAll() {
        return InsurancePlan.find();
    }

    // get an insurance plan by ID

    /**
     * 
     * @param id string id of the plan
     * @returns InsurancePlan schema in question
     */
    async get(id: string) {
        return InsurancePlan.findById(id);
    }

    // delete an insurance plan by ID

    // 
    /**
     * 
     * 
     * @param id sting id of schema to delete
     * @returns ([] Should there be certain codes?)
     */
    async delete(id: string) {
        await InsurancePlan.findByIdAndDelete(id);
    }

    /**
     * Creates insurance plan schema in DB
     * 
     * @param data IInsurancePlan schema
     * @returns 1 ([] Needs a try-except maybe?)
     */
    async create(data: IInsurancePlan){
        const newInsurancePlan = new InsurancePlan(data);
        return newInsurancePlan.save();
    }
    
    /**
     * 
     * 
     * Updates an insurance plan via string id
     * 
     * @param id string id of insurance plan to update
     * @param data data to update the plan with
     * @returns 
     */
    async update(id: string, data: IInsurancePlan){
        await InsurancePlan.findByIdAndUpdate(id, data);
    }
}   
