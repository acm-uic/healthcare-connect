import { Controller, Post, Get, Put, Delete, Res, Body, Param, Req, Query } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';

@Controller('service')
export class ServiceController 
{
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  async createService(@Res() response, @Body() createServiceDto: CreateServiceDto)
  {
    try 
    {
      const newService = await this.serviceService.create(createServiceDto);
      return response.status(201).json({
        message: 'Service successfully created', newService
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
      return response.status(200).json(serviceData);
    } catch (err)
      {
        return response.status(400).json(
        {
          message: 'Error: Services not found'
        })
      }
    }

  //Keeping this here before the id routes so that filter doesn't get interpreted as id
  @Get('filter-location')
  async filterServicesByLocation(@Query('location') location: string, @Res() response) {
    try{
      if(!location){
        return response.status(400).json({
          message: 'Error: Location query parameter is required',
        });
      }
      const services = await this.serviceService.getAll();
      const filteredServices = services.filter(service =>
        service.location.toLowerCase().includes(location.toLowerCase()),
      );
      console.log('Filtered Services:', filteredServices);

      if(filteredServices.length === 0){
        return response.status(400).json({
          message: `No services found for the given location: ${location}`
        });
      }

      return response.status(200).json(filteredServices);
    } catch(err) {
      return response.status(400).json({
        message: 'Error: Unable to filter services',
      });
    }

  }

  @Put(':id')
  async updateService(@Param('id') serviceId: string, @Body() createServiceDto: CreateServiceDto, @Res() response)
  {
    try{
      const updatedService = await this.serviceService.update(serviceId, createServiceDto);
      return updatedService
    } catch (err){
      return response.status(400).json(
        {
          message: 'Error: Service not updated'
        }
      )
    }
  }

  @Delete(':id')
  async deleteService(@Param('id') serviceId: string, @Res() response)
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
  async getService(@Param('id') serviceId: string, @Res() response)
  {
    try{
      const service = await this.serviceService.get(serviceId);
      return response.status(200).json(service);
    } catch (err){
      return response.status(400).json(
        {
          message: 'Error: Service not found'
        }
      )
    }
  }

  // Filter services by languages supported
  @Get('filter-language')
  async filterLanguage(@Req() req: Request, @Res() res, @Query() query: { language: string }){
    try{
      const services = await this.serviceService.getByLanguage(query.language);
      console.log('Services:', services);
      return res.status(200).json(services);
    } catch (error: any){
      return res.status(400).json({ message: error.message });
    }
  }
}

