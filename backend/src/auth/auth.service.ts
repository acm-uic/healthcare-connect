import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../user/user.schema";

@Injectable()
export class AuthService {
  constructor( private jwtService: JwtService ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await User.findOne({ email }).select('+password');
    if (user && await user.comparePassword(password)) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(user: any, res: any) {
    const payload = { sub: user._id };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '1d' });

    res.cookie('access_token', accessToken, { httpOnly: true, secure: true });
    res.cookie('refresh_token', refreshToken, { httpOnly: true, secure: true });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refreshToken(user: any, res: any) {
    const payload = { username: user.username, sub: user._id };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });

    res.cookie('access_token', accessToken, { httpOnly: true, secure: true });
    return { access_token: accessToken };
  }

  async logout(user: any, res: any) {
    
  }
}