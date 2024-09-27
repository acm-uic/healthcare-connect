import { Controller, Post, Req, Res, Next, Body } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { User } from '../user/user.schema';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import sendEmail from '../utils/sendMail';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  async signup(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user object with hashed password
    const newUser = { name, email, password: hashedPassword };

    // Generate activation token
    const tokenInfo = await this.generateActivationToken(newUser);
    const activationUrl = `${process.env.CLIENT_URL}/auth/activate?token=${tokenInfo.token}&code=${tokenInfo.code}`;

    try {
      await sendEmail({
        email: newUser.email,
        subject: 'Activate your account',
        template: 'activation.ejs',
        data: { activationUrl },
      });

      res.status(201).json({ message: 'User created. Check your email to activate your account',
        activationUrl });
    } catch (error: any) {
      console.error('Error sending email:', error);
      next(error);
    }
  }

  // Generate activation token
  async generateActivationToken(user: any) {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '10m' });
    return { token, code };
  }

  // Account activation
  @Post('activate')
  async activate(@Req() req: Request, @Res() res: Response) {
    const { token, code } = req.body;
    
    try {
      const user: any = jwt.verify(token, process.env.JWT_SECRET);

      const existingUser = await User.findOne({ email: user.email });
      if (existingUser) return res.status(400).json({ message: 'User already exists' });

      await User.create(user);
      res.status(200).json({ message: 'User activated' });
    } catch (error) {
      console.error('Error activating user:', error);
      res.status(400).json({ message: 'Invalid token' });
    }
  }

  /**
   * 
   *  NEEDS TESTING
   * 
   * @param req 
   * @param res 
   */
  @Post('signin')
  async signin(@Req() req: Request, @Res() res: Response) {
    const { email, password } = req.body;
    return this.authService.validateUser({ email, password })
  }
}
