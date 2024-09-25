import { Controller, Req, Get, Post, Put, Delete, Param, Body, UseGuards, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post(':userId/save-service/:serviceId')
    async saveService(@Param('userId') userId: string, @Param('serviceId') serviceId: string){
        return this.userService.saveService(userId, serviceId);
    }
}
