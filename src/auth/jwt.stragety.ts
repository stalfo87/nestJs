import { Inject, Injectable, NestMiddleware, UnauthorizedException, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Request, Response, NextFunction } from 'express';
import { User } from './auth.model';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

    constructor (
        @Inject(forwardRef(() => User))
        @InjectModel(User)
        private userModel: typeof User,
        @Inject(forwardRef(() => JwtService))
        private jwtService: JwtService
    ) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const token = req.header('authorization')?.split(' ')?.[1];
        console.log('hola')
        if (!token) throw new UnauthorizedException()
        try {
            const { username } = this.jwtService.verify<JwtPayload>(token, {secret: '3.1416'})
            console.log(username, this.userModel)
            const user: User = await this.userModel.findByPk('0be2b231-560c-42c4-bcb8-efc99e17343e')
            console.log(user)
        } catch(e) {

        }
    }
}
