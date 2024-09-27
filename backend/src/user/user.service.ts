import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { User } from './user.schema';
import { Service } from 'src/services/service.schema';

@Injectable()
export class UserService {

    async getUser(userId: string) {
        const user = await User.findById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;    
    }

    async getUsers() {
        const users = await User.find();
        if (!users || users.length == 0) {
            throw new NotFoundException('Users not found');
        }
        return users;
    }

    async deleteUser(userId: string) {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async updateUser(userId: string, update: any) {
        const user = await User.findByIdAndUpdate(userId, update, {new: true});
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;   
    }
    
    async saveService(userId: string, serviceId: string) {
        const user = await User.findById(userId);

        // Error handling for if user wasn't found
        if(!user) {
            throw new NotFoundException('User ID not found');
        }

        // Error handling for if service ID wasn't found
        const service = await Service.findById(serviceId);
        if(!service){
            throw new NotFoundException('Service ID not found'); 
        }

        // Pushes the service ID into the savedServices array
        if(!user.savedServices.includes(serviceId)) {
            user.savedServices.push(serviceId);
            await user.save();
        }

        // Error handling for if service ID already exists
        else {
            throw new BadRequestException('Saved service already exists');
        }
        return user;
    }
}