import { Controller, Post, Get, Put, Delete, Res, Body, Param } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { response } from 'express';

@Controller('service')
export class ServiceController 
{
  constructor(private readonly serviceService: ServiceService) { }

  @Post()
  async createService(@Res() response, @Body() createServiceDto: CreateServiceDto)
  {
    try 
    {
      const newService = await this.serviceService.create(createServiceDto);
      return response.status(201).json({
        message: 'Service has been created successfully', newService
      });
    } catch (err){
        return response.status(400).json({
          message: 'Error: Service not created!', error: 'Bad request'
        });
    }
  }

  @Get()
  async getAllServices(@Res() response) 
  {
    try
    {
      const serviceData = await this.serviceService.getAll();
      return response.status(201).json({
        message: 'All services data found successfully', serviceData});
    } catch (err)
      {
        return response.status(400).json(
        {
          message: 'Error: Services not found'
        })
      }
    }

  // @Put('/:id')
  // async updateService(@Res() Response, @Param('id') serviceId: string, @Body() updateServiceDto: UpdateServiceDto) 
  // {
  //   try 
  //     {
  //     const existingService = await this.serviceService.updateService(serviceId, updateServiceDto);
  //     return response.status(201).json({
  //       message: 'Service successfully updated', existingService});

  //     } catch (err)
  //     {
  //       return response.status(400).json(
  //         {
  //           message: 'Error: Service not updated'
  //         }
  //       )
  //     }
  // }

  @Delete(':id')
  async deleteService(@Param('id') serviceId: string)
  {
    try{
      const deletedService = await this.serviceService.delete(serviceId);
      return response.status(201).json({
        message: 'Service successfully deleted', deletedService
      })
    } catch (err){
      return response.status(400).json(
        {
          message: 'Error: Service not deleted'
        }
      )
    }
  }

  @Get(':id')
  async getService(@Param('id') serviceId: string)
  {
    try{
      const specificService = await this.serviceService.get(serviceId);
      return response.status(201).json({
        message: 'Service successfully received', specificService
      })
    } catch (err){
      return response.status(400).json({
        message: 'Error: Service not found'
      })
    }
  }
}

