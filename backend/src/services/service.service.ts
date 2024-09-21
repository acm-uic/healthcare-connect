import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Service, IService } from './service.schema';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectModel } from '@nestjs/mongoose';
import { NotFoundError } from 'rxjs';



@Injectable()
export class ServiceService 
    {
        constructor(@InjectModel('Service') private serviceModel:Model<IService>) { }

        async createService(createServiceDto: CreateServiceDto): Promise<IService> {
            const newService = await new this.serviceModel(createServiceDto);
            return newService.save();
        }

        async getAllServices(): Promise<IService[]>{
            const serviceData = await this.serviceModel.find();

            if (!serviceData || serviceData.length == 0){
                throw new NotFoundException('Services data not found!');
            }
            return serviceData;
        }
        
        async updateService(serviceId: string, updateServiceDto: UpdateServiceDto): Promise<IService>
        {
            const existingService = await this.serviceModel.findByIdAndUpdate(serviceId, updateServiceDto, {new: true});
            if(!existingService){
                throw new NotFoundException('Service #${serviceId} not found');
            }
            return existingService;
        }

        async deleteService(serviceId: string): Promise<IService>
        {
            const deletedService = await this.serviceModel.findByIdAndDelete(serviceId);
            if(!deletedService){
                throw new NotFoundException('Service #${serviceId} not found');
            }
            return deletedService;
        }

        async getService(serviceId: string): Promise<IService>
        {
            const specificService = await this.serviceModel.findById(serviceId);
            if(!specificService){
                throw new NotFoundException('Service #${serviceId} not found');
            }
            return specificService;
        }

    }

