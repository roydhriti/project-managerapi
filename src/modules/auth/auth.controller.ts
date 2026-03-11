import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';


@ApiTags('Users')
@ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
        register(@Body() body: RegisterDto) {
        return this.authService.register(
            body.name,
            body.email,
            body.password,
        );
    }

    @Post('login')
    login(@Body() body: LoginDto) {
        return this.authService.login(body.email, body.password);
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth() {}

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req) {
        return this.authService.googleLogin(req.user);
    }
    
    // @Post('login')
    //     login(@Body() body: any) {
    //     return this.authService.login(
    //     body.email,
    //     body.password,
    //     );
    // }
}