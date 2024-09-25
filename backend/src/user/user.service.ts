import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { User } from './user.schema';

@Injectable()
export class UserService {
    
    async saveService(userId: string, serviceId: string) {
        const user = await User.findById(userId);
        if(!user.savedServices.includes(serviceId)) {
            user.savedServices.push(serviceId);
            await user.save();
        }
        return user;
    }
}