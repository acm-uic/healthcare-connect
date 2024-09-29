import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import bcrypt from "bcryptjs";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  async validateUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<string> {
    if (!email || !password)
      throw new BadRequestException("Email and password are required");

    const user = await this.userService.getUserByEmail(email);

    if (!user) throw new NotFoundException("User not found");

    const isSamePassword = await bcrypt.compare(password, user.password)

    if (!isSamePassword) throw new BadRequestException("Invalid password");

    const token = this.jwtService.sign({ sub: user._id, email: user.email, role: user.role });

    return token;
  }
}