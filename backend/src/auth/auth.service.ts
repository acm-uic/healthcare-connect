import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import bcrypt from "bcryptjs";

//Temporary until UserService is implemented
import { User } from "src/user/user.schema";


@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<string> {
    if (!email || !password)
      throw new BadRequestException("Email and password are required");

    const user = await User.findOne({ email });

    if (!user) throw new NotFoundException("User not found");

    const isSamePassword = await bcrypt.compare(password, user.password)

    if (!isSamePassword) throw new BadRequestException("Invalid password");

    const token = this.jwtService.sign({ sub: user._id, email: user.email, role: user.role });

    return token;
  }
}

/**
 * _***Sign In error messages in one spot!!***_
 */
export const AuthClientSideErrorMessages = {
    internalError:"An internal server error has occured, please notify Dev Team.",
    incorrectPwd: "Password Incorrect",
    emailNotFound: "User email not found",
    noPwd:"Missing Password!",
    noEmail:"Missing Email!"
}


