import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dtos/auth-credentials.dta';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {}

    @Public()
    @Post('/signup')
    signUp(@Body() authCredentialsDto: AuthCredentialsDto) {
        return this.authService.signUp(authCredentialsDto)
    }

    @Public()
    @Post('/signin')
    signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService. signIn(authCredentialsDto)
    }

}
