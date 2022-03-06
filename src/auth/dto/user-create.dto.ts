import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'email', required: true })
  email: string;

  @IsString()
  @MaxLength(10)
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'name',
    minLength: 3,
    maxLength: 30,
    default: 'This is a fake title',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'password', required: true })
  password: string;
}

export class ResponseDto {
  @ApiProperty({ type: String, description: 'token' })
  access_token: string;

  @ApiProperty({ type: Number, description: 'user id' })
  id: number;
}
