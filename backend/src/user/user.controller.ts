import { Controller, Req, Get, Post, Put, Delete, Param, Body, UseGuards, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/:serviceId')  
  async saveService(
  @Res() response,
   @Param('userId') userId: string,
   @Param('serviceId') serviceId: string,
  )
  {
    const savedService = this.userService.save(userId, serviceId);
    return response.status(201).json({
      message: 'Service successfully saved', savedService
    })
  } catch (err)
  {
    return response.status(400).json(
      {
        message: 'Error: Service not saved'
      }
    )
  }
}
