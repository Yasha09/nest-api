import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCreateDto } from './dto/user-create.dto';
// import { User } from '../user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: UserCreateDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: UserCreateDto) {
    return this.authService.signin(dto);
  }
}
