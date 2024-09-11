import { Controller, Delete, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  get(): string {
    return "User is running!";
  }

  @Delete("delete")
  delete(): string {
    return "delete!";
  }
}
