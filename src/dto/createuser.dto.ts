import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength, Validate } from "class-validator"

class CreateUserDto {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    confirmPassword: string;
}
export {
    CreateUserDto
}