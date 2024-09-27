import { Controller, Req, Get, Post, Put, Delete, Param, Body, UseGuards, Res, BadRequestException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id') id: string) {
    try {
      const user = await this.userService.getUser(id);
      return user;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  @Get()
  async getUsers() {
    try {
      const users = await this.userService.getUsers();
      return users;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    try {
      const deletedUser = await this.userService.deleteUser(id);
      return deletedUser;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() update: any) {
    try {
      const updatedUser = await this.userService.updateUser(id, update);
      return updatedUser;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  @Post(':userId/save-service/:serviceId')
    async saveService(@Param('userId') userId: string, @Param('serviceId') serviceId: string){
      try
      {
        const savedService = await this.userService.saveService(userId, serviceId);
        return savedService;
      } 
      catch(err)
      {
        console.error(err);
        throw err;
      }
    }
}
