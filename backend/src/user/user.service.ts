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

    async getUserByEmail(email: string) {
        const user = await User.findOne({email: email});
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

    async getServices(userId: string) {
        const user = await User.findById(userId).populate('savedServices');
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user.savedServices;
    }
    
    async saveService(userId: string, serviceId: string) {
        const user = await User.findById(userId);

        if(!user) {
            throw new NotFoundException('User ID not found');
        }

        const service = await Service.findById(serviceId);
        if(!service){
            throw new NotFoundException('Service ID not found'); 
        }

        if(!user.savedServices.includes(serviceId)) {
            user.savedServices.push(serviceId);
            await user.save();
        }

        else {
            throw new BadRequestException('Saved service already exists');
        }
        return user;
    }

    async removeSavedService(userId: string, serviceId: string){
        const user = await User.findById(userId);

        if(!user){
            throw new NotFoundException("User not found");
        }

        if(!user.savedServices.includes(serviceId)){
            throw new NotFoundException("Saved Service is not found");
        }

        user.savedServices = user.savedServices.filter((savedServiceId) => {
            savedServiceId.toString() !== serviceId
        });

        await user.save();
        return user;
    }
}