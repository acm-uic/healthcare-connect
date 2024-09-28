import { Controller, Get, Delete, Post, Put, Param, Body, Query, Req, Res } from '@nestjs/common';
import { InsuranceService } from './insurance.service';
import { IInsurancePlan } from './insurance.schema';

@Controller('insurance-plan')
export class InsuranceController {
  constructor(private readonly insuranceService: InsuranceService) {}

  @Get('filter')
  async filterInsurancePlans(
    @Req() req,
    @Res() res,
    @Query() query: { minPrice: number; maxPrice: number },
  ) {
    try {
      const insurancePlans = await this.insuranceService.getAll();
      const filteredPlans = insurancePlans.filter((plan) => {
        return (
          plan.monthlyPremium <= query.maxPrice &&
          plan.monthlyPremium >= query.minPrice
        );
      });
      return res.status(200).json(filteredPlans);
    } catch (error) {
      return res.status(400).json({ message: 'Error: Insurance plans not found' });
    }
  }

  @Get()
  async getAllInsurancePlans(){
    return this.insuranceService.getAll();
  }

  @Get(':id')
  async getInsurancePlanByID(@Param('id') id: string){
    return this.insuranceService.get(id);
  }


  @Delete(':id')
  async deleteSpecificInsurancePlan(@Param('id') id: string){
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
