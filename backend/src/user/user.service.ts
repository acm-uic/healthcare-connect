import { Injectable } from '@nestjs/common';
import { User } from './user.schema';

@Injectable()
export class UserService {

    async getUser(id: string){
        return User.findById(id);
    }
   
}
