import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { InsuranceController } from './insurance/insurance.controller';
import { InsuranceService } from './insurance/insurance.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ServiceController } from './services/service.controller';
import { ServiceService } from './services/service.service';

@Module({
  imports: [],
  controllers: [AuthController, InsuranceController, UserController, ServiceController],
  providers: [AuthService, InsuranceService, UserService, ServiceService],
})
export class AppModule {}
