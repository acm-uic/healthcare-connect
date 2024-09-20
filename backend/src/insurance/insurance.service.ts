import { Injectable } from '@nestjs/common';
import { IInsurancePlan, InsurancePlan } from './insurance.schema';

@Injectable()
export class InsuranceService {

    /**
     * Gets all the insurance plans from DB
     * 
     * @returns InsurancePlan array
     */
    async getAll() {
        return InsurancePlan.find();
    }

    /**
     * 
     * Retrieves an InsurancePlan schema by ID.
     * 
     * @param id string id of the plan
     * @returns InsurancePlan schema in question
     */
    async get(id: string) {
        return InsurancePlan.findById(id);
    }

    /**
     * 
     * Deletes an insurance plan schema from DB
     * 
     * @param id sting id of schema to delete
     * @returns nil []
     */
    async delete(id: string) {
        await InsurancePlan.findByIdAndDelete(id);
    }

    /**
     * Creates insurance plan schema in DB
     * 
     * @param data IInsurancePlan schema
     * @returns a copy of the schema with datestamps and ID
     */
    async create(data: IInsurancePlan){
        //Create a new insurance plan with the schema of data we got.
        const newInsurancePlan = new InsurancePlan(data);
        // and send a copy of the data from the DB,
        // after saving it into the DB of course. 
        return newInsurancePlan.save();
    }
    
    /**
     * 
     * Updates an insurance plan via string id
     * 
     * @param id string id of insurance plan to update
     * @param data IInsurancePlan data schema to update the plan with
     * @returns nil []
     */
    async update(id: string, data: IInsurancePlan){
        await InsurancePlan.findByIdAndUpdate(id, data);
    }
}   
