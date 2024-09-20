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
     *  ***Needs testing []***
     * 
     *  "I tried deleting, but it never worked... Maybe a priviledge issue?"
     * 
     * @param id sting id of schema to delete
     * @returns ([] Should there be certain codes?)
     */
    async delete(id: string) {
        InsurancePlan.findByIdAndDelete(id);
        console.log(`Deleted insurance plan id ${id}...`)
        return "BANNED!"
    }

    /**
     * Creates insurance plan schema in DB
     * 
     * @param data IInsurancePlan schema
     * @returns 1 ([] Needs a try-except maybe?)
     */
    async create(data: IInsurancePlan){
        InsurancePlan.create(data);
        return 1
    }

    
    /**
     * 
     * ***Needs testing []***
     * 
     * Updates an insurance plan via string id
     * 
     * @param id string id of insurance plan to update
     * @param data data to update the plan with
     * @returns 
     */
    async update(id:string, data: IInsurancePlan){
        InsurancePlan.findByIdAndUpdate(id, data);
        return 1
    }
}   
