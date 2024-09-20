import { Controller, Get, Delete, Post, Put, Param, Body } from '@nestjs/common';
import { InsuranceService } from './insurance.service';
import { IInsurancePlan } from './insurance.schema';
import { Roles } from 'src/auth/roles.decorator';

@Controller('insurance')
export class InsuranceController {
  constructor(private readonly insuranceService: InsuranceService) {}

  @Roles('admin')
  @Get()
  async getAllInsurancePlans(){
    return this.insuranceService.getAll();
  }

  @Get(':id')
  async getInsurancePlanByID(@Param('id') id:string){
    return this.insuranceService.get(id);
  }


  @Delete(':id')
  async deleteSpecificInsurancePlan(@Param('id') id:string){
    return this.insuranceService.delete(id)
  }

  @Post()
  async createInsurancePlan(@Body() data: IInsurancePlan){
    return this.insuranceService.create(data)
  }

  @Put(':id')
  async updateInsurancePlan(@Param('id') id: string, @Body() data: IInsurancePlan){
    return this.insuranceService.update(id,data)

  }
}
