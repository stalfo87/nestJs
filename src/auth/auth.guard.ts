import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from 'express';
import { User } from './auth.model';
import { JwtPayload } from './jwt-payload.interface';
import { IS_PUBLIC_KEY } from 'src/decorators/public.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
        private jwtService: JwtService, 
        private reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }

        const request: Request = context.switchToHttp().getRequest();
        const token = request.header('authorization')?.split(' ')?.[1];
        if (!token) throw new UnauthorizedException()
        try {
            const { username } = await this.jwtService.verifyAsync<JwtPayload>(token, { secret: '3.1416' })
            const user: User = await User.findOne({ where: { username }, plain: true, raw: true })
            if (!user) throw new UnauthorizedException()
                request['user'] = user
            return true
        } catch {
            throw new UnauthorizedException();
        }
    }
}