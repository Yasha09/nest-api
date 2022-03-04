import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'email' })
  email: string;

  @IsString()
  @ApiProperty({ type: String, description: 'name' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'password' })
  password: string;
}
