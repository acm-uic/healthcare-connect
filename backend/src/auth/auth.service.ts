import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./interfaces/jwt.payload";

//Temporary until UserService is implemented
import { User } from "src/user/user.schema";
import { isValidObjectId } from "mongoose";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUserById(userId: string): Promise<boolean> {

    if (!isValidObjectId(userId)) return false;

    const user = await User.findById(userId);

    return !!user;
  }
}
