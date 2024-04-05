import { Injectable } from '@nestjs/common';
import { User } from './auth.model';
import { InjectModel } from '@nestjs/sequelize';
import { AuthCredentialsDto } from './dtos/auth-credentials.dta';

@Injectable()
export class AuthService {
    constructor (
        @InjectModel(User)
        private userModel: typeof User
    ) {
        
    }

    async singUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        await this.userModel.createUser(authCredentialsDto)
    }
}
