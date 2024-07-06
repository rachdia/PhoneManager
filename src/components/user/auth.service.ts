import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../../dto/createuser.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async register(userDto: CreateUserDto): Promise<User> {
        const { email, password, confirmPassword, ...rest } = userDto;
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new BadRequestException('Email address already in use');
        }
        if (password !== confirmPassword) {
            throw new BadRequestException(`Passwords don't match`)
        }
        const hashedPassword = await bcrypt.hash(userDto.password, 10);
        const newUser = this.userRepository.create({ email, password: hashedPassword, ...rest });
        return this.userRepository.save(newUser);
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userRepository.findOne({ where: { email } });
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async getUserInfo(UserId: number): Promise<User> {
        const user = await this.userRepository.findOne(UserId as any);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

}
