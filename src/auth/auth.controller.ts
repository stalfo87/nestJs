import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dtos/auth-credentials.dta';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {}

    @Post('/singUp')
    singUp(@Body() authCredentialsDto: AuthCredentialsDto) {
        return this.authService.singUp(authCredentialsDto)
    }
}
