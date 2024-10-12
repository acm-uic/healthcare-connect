import { Module } from "@nestjs/common";
import { InsuranceController } from "./insurance/insurance.controller";
import { InsuranceService } from "./insurance/insurance.service";
import { UserController } from "./user/user.controller";
import { UserService } from "./user/user.service";
import { ServiceController } from "./services/service.controller";
import { ServiceService } from "./services/service.service";
import { AuthModule } from "./auth/auth.module";
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [AuthModule, StripeModule],
  controllers: [InsuranceController, UserController, ServiceController],
  providers: [InsuranceService, UserService, ServiceService],
})
export class AppModule {}
