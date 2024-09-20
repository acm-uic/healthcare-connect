import { Controller, Post, Body } from '@nestjs/common';
import { InsuranceService } from './insurance.service';
import { IInsurancePlan } from './insurance.schema';

@Controller('insurance')
export class InsuranceController {
  constructor(private readonly insuranceService: InsuranceService) {}

  // @Post()
  // async createInsurance(@Body() insurance: IInsurancePlan) {
  //   return this.insuranceService.create(insurance);
  // }
}
