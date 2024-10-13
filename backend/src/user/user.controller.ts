import { Controller, Req, Get, Post, Put, Delete, Param, Body, UseGuards, Res, BadRequestException, HttpStatus, NotFoundException  } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@UseGuards(JwtGuard, RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async getMe(@Req() req: any) {
    try {
      const userId = req.user.sub
      const user = await this.userService.getUser(userId);
      return user;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

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

  @Get(':userId/services')
    async getServices(@Param('userId') userId: string){
      try
      {
        const services = await this.userService.getServices(userId);
        return services;
      } 
      catch(err)
      {
        console.error(err);
        throw err;
      }
  }
    
  @Delete(':userId/remove-service/:serviceId')
  async removeSavedService(
    @Param('userId') userId: string,
    @Param('serviceId') serviceId: string
  ){
    try{
      const updatedUser = await this.userService.removeSavedService(userId, serviceId);
      return {
        message: 'Service removed successfully',
        user: updatedUser,
      };

    } catch(err){
      console.log(err);
      throw err;
    }
  }
}
