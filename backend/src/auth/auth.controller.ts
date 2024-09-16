import { Controller, Post, Req, Res, Next } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { User } from '../user/user.schema'
import * as jwt from 'jsonwebtoken';
import sendEmail from '../utils/sendMail';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction){
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if(user) return res.status(400).json({ message: 'User already exists' });
    
    const newUser = { email, password };

    const activationToken = await this.generateActivationToken(newUser);
    const activationUrl = `${process.env.CLIENT_URL}/auth/activate/${activationToken}`;

    try {
      await sendEmail({
        email: newUser.email,
        subject: 'Activate your account',
        template: 'activation.ejs',
        data: { activationUrl }
      });

      res.status(201).json({ message: 'User created. Check your email to activate your account' });
    } catch (error: any) {
      console.error('Error sending email:', error);
      next(error);
    }
  }

  async generateActivationToken(user: { email: string, password: string }) {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    const token = jwt.sign({ email: user.email, code }, process.env.JWT_SECRET as string, { expiresIn: '10m' });
    return token;
  }
}
