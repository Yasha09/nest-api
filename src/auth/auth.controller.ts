import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserCreateDto } from './dto/user-create.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiCreatedResponse({ description: 'User Registration' })
  @ApiBody({ type: UserCreateDto })
  signup(@Body() dto: UserCreateDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  @ApiCreatedResponse({ description: 'User Login' })
  @ApiUnauthorizedResponse({ description: 'Invalid credential' })
  @ApiBody({ type: UserCreateDto })
  signin(@Body() dto: UserCreateDto) {
    return this.authService.signin(dto);
  }
}
