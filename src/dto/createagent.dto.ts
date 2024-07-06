import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CreateAgentDto {
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @IsNotEmpty()
    @IsString()
    phoneNumber: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    destinationGroup: string;

    @IsNotEmpty()
    registrationDate: Date;

    @IsNotEmpty()
    canMakeCalls: boolean;

    @IsNotEmpty()
    photo: string;
}
