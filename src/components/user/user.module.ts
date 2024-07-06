import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserController } from "./user.controller";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../entities/user.entity";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: "rach",
            signOptions: { expiresIn: '1h' },
            global: true,
        }),
    ],
    controllers: [UserController, AuthController],
    providers: [AuthService, JwtStrategy]
})
export class UserModule { }