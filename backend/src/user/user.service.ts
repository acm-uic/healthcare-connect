import { Injectable } from '@nestjs/common';
import { User } from './user.schema';

@Injectable()
export class UserService {
   async getAll(){
    return await User.find();
   }
   async get(id: string) {
      return await User.findById(id)
   }
   async delete(id: string) {
      return await User.findByIdAndDelete(id)
   }
   async update(id: string) {
      return await User.findByIdAndUpdate(id)
   }
}

