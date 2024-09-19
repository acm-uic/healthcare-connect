import { Controller, Req, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


}
