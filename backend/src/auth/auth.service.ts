import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  
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


