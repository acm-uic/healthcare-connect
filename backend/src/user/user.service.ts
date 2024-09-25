import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { IUser, User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<IUser>) {}
    async save(userId: string, serviceId: string): Promise<IUser>

    {
        // Checks if the user exists by ID
        const user = await this.userModel.findById(userId);
        if (!user) 
            {
                throw new NotFoundException('User not found');
            }

        //Checks if the service already exists by ID
        if (user.savedServices.includes(serviceId))
            {
                throw new BadRequestException('Service already exists');
            }

        //Adds the service ID to user profile
        user.savedServices.push(serviceId);
        await user.save();
        return user;
    } 
}