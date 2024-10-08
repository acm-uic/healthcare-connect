import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) return true;

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        
        return roles.includes(user.role);
    }
}