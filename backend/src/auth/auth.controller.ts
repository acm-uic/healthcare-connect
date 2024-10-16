import { Controller, Post, Req, Res, Next, Body, Query } from '@nestjs/common';
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
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user object with hashed password
    const newUser = { name, email, password: hashedPassword, role: role || 'user' };

    // Generate activation token
    const tokenInfo = await this.generateActivationToken(newUser);
    const activationUrl = `${process.env.CLIENT_URL}/activate?token=${tokenInfo.token}&code=${tokenInfo.code}`;

    try {
      await sendEmail({
        email: newUser.email,
        subject: 'Activate your account',
        template: 'activation.ejs',
        data: { activationUrl },
      });
      res.status(201).json({
        message: 'User created. Check your email to activate your account',
        activationUrl
      });
    } catch (error: any) {
      console.error('Error sending email:', error);
      next(error);
    }
  }

  // Generate activation token
  async generateActivationToken(user: any) {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
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

  @Post('signin')
  async signin(@Req() req: Request, @Res() res: Response) {
    try {
      const { email, password } = req.body
      if (!email || !password) return res.status(400).json({ message: 'Please provide an email and password' });

      const user = await this.authService.validateUser(email, password);
      if (!user) return res.status(400).json({ message: 'Invalid credentials' })

      const tokens = await this.authService.login(user, res);
      return res.status(200).json(tokens);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  /**
   * Generates a JWT for a user.
   * 
   * @param user **Any** *(supposed to be a User)*
   * @param expiration  **string** *Numerical value (ie: '10m' for 10 minutes; '1h' for 1 hr)*
   * @returns **JSON object** *with signed JWT*
   */
  async generateToken(user: any) {
    const token = jwt.sign({ user: user }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return { token };
  }

  // https://supertokens.com/blog/implementing-a-forgot-password-flow
  // https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html
  @Post('forgot-password')
  async forgotPassword(@Req() req: Request, @Res() res: Response) {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: 'User not found' });

    const resetToken = await this.generateToken(user) 
    const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken.token}`;
    const template = 'reset-password.ejs';

    try {
      await sendEmail({
        email: user.email,
        subject: 'Reset Password',
        template,
        data: { resetLink },
      });
      res.status(200).json({
        success: true,
        message: 'Reset password link sent to email',
        resetToken: resetToken.token,
      });
    }catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  @Post('reset-password')
  async resetPassword(@Req() req: Request, @Res() res: Response) {
    
  }
  
}
