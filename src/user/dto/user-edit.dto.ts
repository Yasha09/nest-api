import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserEditDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
