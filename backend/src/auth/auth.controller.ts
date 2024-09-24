import { Controller, Post, Req, Res, Next, Body } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { User } from '../user/user.schema'
import * as jwt from 'jsonwebtoken';
import sendEmail from '../utils/sendMail';

import bcrypt from "bcrypt";


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  async signup(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

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


  /**
   * 
   * NEEDS TESTING []
   * 
   * @param req 
   * @param res 
   * @param next
   * @returns 
   */
  @Post('signin')
  async signin(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    // If there is an error that occurs in any of this, send an internal server error.
    try {
      // Hmm
      const { email, password } = req.body;
      // find the user
      const user = await User.findOne({ email });

      // Check: email not found error:
      if (!user) {
        return res.status(400).json({ message: 'User email not found' });
      }

      // user.password is a hash...
      // call back can be added here []
      if(bcrypt.compare(password, user.password)){
        console.log("sucessful login of " + email);

        //if successful return user id and role.
        return {
          "User role": user.role,
          "User ID": user.id
        }
      }
      // if not, just 
      return res.status(401).json({message: 'Password Incorrect'});
    }
    catch (error) {
      console.log("Error has occured in auth.controller: " + error)
      return res.status(500).json({ message: 'An internal server error has occured, please notify Dev Team.' });
    }
  }
}
