import { Injectable } from '@nestjs/common';
import { User } from './auth.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AuthService {
    constructor (
        @InjectModel(User)
        private userModel: User
    ) {
        
    }
}
