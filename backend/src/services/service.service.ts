import { Injectable, NotFoundException } from '@nestjs/common';
import { IService, Service } from './service.schema';
import { CreateServiceDto } from './dto/create-service.dto';

@Injectable()
export class ServiceService {

    async create(createServiceDto: CreateServiceDto): Promise<IService> {
        const newService = await new Service(createServiceDto);
        return newService.save();
    }

    async getAll(): Promise<IService[]>{
        const serviceData = await Service.find();

        if (!serviceData || serviceData.length == 0){
            throw new NotFoundException('Services data not found!');
        }
        return serviceData;
    }
    
    // async updateService(serviceId: string, updateServiceDto: UpdateServiceDto): Promise<IService>
    // {
    //     const existingService = await this.serviceModel.findByIdAndUpdate(serviceId, updateServiceDto, {new: true});
    //     if(!existingService){
    //         throw new NotFoundException('Service #${serviceId} not found');
    //     }
    //     return existingService;
    // }

    async delete(serviceId: string): Promise<IService>
    {
        const deletedService = await Service.findByIdAndDelete(serviceId);
        if(!deletedService){
            throw new NotFoundException('Service #${serviceId} not found');
        }
        return deletedService;
    }

    async get(serviceId: string): Promise<IService>
    {
        const service = await Service.findById(serviceId);
        if(!service){
            throw new NotFoundException('Service #${serviceId} not found');
        }
        return service;
    }

}

