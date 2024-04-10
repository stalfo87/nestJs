import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './auth.model';
import { InjectModel } from '@nestjs/sequelize';
import { AuthCredentialsDto } from './dtos/auth-credentials.dta';
import { compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor (
        @InjectModel(User)
        private userModel: typeof User,
        private jwtService: JwtService
    ) {
        
    }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        await this.userModel.createUser(authCredentialsDto)
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string}> {
        const {username, password} = authCredentialsDto
        const user = await this.userModel.findOne({
            attributes: ['password'],
            where: {
                username
            }
        })

        if (user && (await compare(password, user.password))) {
            const payload: JwtPayload = {
                username
            }
            const accessToken: string = this.jwtService.sign(payload, {secret: '3.1416'})
            return { accessToken }
        } else {
            throw new UnauthorizedException()
        }
    }
}
