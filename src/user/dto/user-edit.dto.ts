import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserEditDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'email' })
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'name' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'password' })
  password: string;
}
