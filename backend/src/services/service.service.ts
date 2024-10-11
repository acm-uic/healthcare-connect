import { Injectable, NotFoundException } from '@nestjs/common';
import { IService, Service } from './service.schema';
import { CreateServiceDto } from './dto/create-service.dto';

@Injectable()
export class ServiceService {

    async create(createServiceDto: CreateServiceDto): Promise<IService> {
        const newService = new Service(createServiceDto);
        return newService.save();
    }

    async getAll() {
        const serviceData = await Service.find();

        if (!serviceData || serviceData.length == 0){
            throw new NotFoundException('Services data not found!');
        }
        return serviceData;
    }

    async delete(serviceId: string)
    {
        const deletedService = await Service.findByIdAndDelete(serviceId);
        if(!deletedService){
            throw new NotFoundException('Service not found');
        }
        return deletedService;
    }

    async get(serviceId: string) {
        const service = await Service.findById(serviceId);
        if (!service){
            throw new NotFoundException('Service not found');
        }
        return service
    }

    async update(serviceId: string, createServiceDto: CreateServiceDto) {
        const updatedService = await Service.findByIdAndUpdate(serviceId, createServiceDto, {new: true});
        if (!updatedService){
            throw new NotFoundException('Service not found');
        }
        return updatedService;
    }

    async getByLanguage(language: string) {
        // Logging to debug
        console.log('Query Language:', language); // Logs the incoming query language
    
        // MongoDB query using case-insensitive regex
        const services = await Service.find({ languagesSupported: { $regex: new RegExp(language, 'i') } });
        
        // Debugging output
        console.log('Found Services:', services);
    
        // Throw exception if no services are found
        if (!services || services.length === 0) {
            throw new NotFoundException('Services not found');
        }
    
        return services;
    }    
    
}

