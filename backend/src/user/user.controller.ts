import { Controller, Req, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getAll')
  async getUsers(){
    const users = this.userService.getAll();
    return users;
  }
  @Get(':id')
  async getUser(@Param('id')id:string){
    const user = this.userService.get(id)
    return user;
  }
  
}
