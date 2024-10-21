import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { User } from 'src/user/user.schema';
import { InsurancePlan, IInsurancePlan } from 'src/insurance/insurance.schema';

@Injectable()
export class InsuranceService {

    /**
     * Gets all the insurance plans from DB
     * 
     * @returns InsurancePlan array
     */
    async getAll() 
    {
        const insurances = await InsurancePlan.find();
        if (!insurances)
            {
                throw new NotFoundException('No insurances were found');
            }
            return insurances;
    }

    /**
     * 
     * Retrieves an InsurancePlan schema by ID.
     * 
     * @param id string id of the plan
     * @returns InsurancePlan schema in question
     */
    async get(id: string) 
    {
        const plan = await InsurancePlan.findById(id);
        if (!plan)
            {
                throw new NotFoundException('No insurances by this ID was found');
            }
            return plan;
    }

    /**
     * 
     * Deletes an insurance plan schema from DB
     * 
     * @param id sting id of schema to delete
     * @returns nil []
     */
    async delete(id: string) 
    {
        const plan = await InsurancePlan.findByIdAndDelete(id);
        if (!plan)
            {
                throw new NotFoundException('No insurance plan by that ID was found');
            }
            return plan;
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
        const plan = await InsurancePlan.findByIdAndUpdate(id, data);
        if (!plan)
            {
                throw new NotFoundException('No insurance by that ID was found')
            }
            return plan;
    }
}   
