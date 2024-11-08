import { Controller, Get, Delete, Post, Put, Param, Body, Query, Req, Res, UseGuards } from '@nestjs/common';
import { InsuranceService } from './insurance.service';
import { IInsurancePlan } from './insurance.schema';
import { JwtGuard } from '../auth/jwt-auth.guard';

@Controller('insurance-plan')
export class InsuranceController {
  constructor(private readonly insuranceService: InsuranceService) {}

  @Get('filter-monthly-premium')
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
  async getAllInsurancePlans(@Res() res){
    try 
    { 
      const plan = await this.insuranceService.getAll()
      return res.status(200).json(plan);
    } catch(error)
    {
      return res.status(404).json({ message: 'Error: No insurance plans were found' })
    }
  }

  @Get(':id')
  async getInsurancePlanByID(@Param('id') id: string, @Res() res){
    try
    {
      const plan = await this.insuranceService.get(id);
      return await res.status(200).json(plan);
    }
    catch(error)
    {
      return res.status(404).json({message: 'Error: No insurances by that ID was found'})
    }
  }


  @Delete(':id')
  async deleteInsurancePlan(@Param('id') id: string, @Res() res){
    try
    {
      const plan = await this.insuranceService.delete(id)
      return res.status(200).json(plan);
    }
    catch(error)
    {
      return res.status(404).json({message: 'Error: No insurances by that ID was found'})
    }
  }

  @Post()
  async createInsurancePlan(@Body() data: IInsurancePlan){
    return this.insuranceService.create(data)
  }

  @Put(':id')
  async updateInsurancePlan(@Param('id') id: string, @Body() data: IInsurancePlan, @Res() res){
    try
    {
      const plan = await this.insuranceService.update(id,data)
      return res.status(200).json(plan);
    }
    catch(error)
    {
      return res.status(404).json({message: 'Error: No insurances by that ID was found'})
    }
  }

  @Get('/provider/:providerId')
  async getInsurancePlanByProvider(@Param('providerId') providerId: string, @Res() res){
    try
    {
      const plan = await this.insuranceService.getByProvider(providerId);
      return res.status(200).json(plan);
    }
    catch(error)
    {
      return res.status(404).json({message: 'Error: No insurances by that provider ID was found'})
    }
  }
}
