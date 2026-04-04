import { IsNotEmpty, IsString,  } from 'class-validator'

export class RegisterUserDto {
    @IsString()
    paraphrase?: string;

    @IsString()
    @IsNotEmpty()
    username!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;
} 