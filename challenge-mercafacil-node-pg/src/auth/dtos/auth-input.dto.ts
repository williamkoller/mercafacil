import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthInputDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
