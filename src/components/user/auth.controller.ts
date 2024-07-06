import { BadRequestException, Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../../dto/createuser.dto";
import { JwtAuthGuard } from './jwt-auth.guard';
import { response } from "express";
import { validate } from "class-validator";

@ApiTags('auth')
@Controller('/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        const errors = await validate(createUserDto);
        if (errors.length > 0) {
            throw new BadRequestException(errors);
        }
        return this.authService.register(createUserDto);
    }

    @Post('login')
    async login(@Body() loginUserDto: CreateUserDto) {
        const user = await this.authService.validateUser(loginUserDto.email, loginUserDto.password);
        if (!user) {
            return { message: 'Invalid credentials' };
        }
        return this.authService.login(user);
    }

    @Get('info')
    @UseGuards(JwtAuthGuard)
    async getUserInfo(@Req() request): Promise<any> {
        const userId = request.user.UserId;
        const userInfo = await this.authService.getUserInfo(userId);
        return userInfo;
    }
}