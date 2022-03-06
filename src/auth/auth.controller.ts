import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserCreateDto, ResponseDto } from './dto/user-create.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiResponse({
    status: 200,
    description: 'User Signup',
    type: ResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiOperation({ summary: 'Register user' })
  signup(@Body() dto: UserCreateDto): Promise<ResponseDto> {
    return this.authService.signup(dto);
  }

  @Post('signin')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: ResponseDto,
  })
  @ApiOperation({ summary: 'Changes the users password' })
  @ApiNotFoundResponse({
    status: 403,
    description: 'forbidden',
  })
  signin(@Body() dto: UserCreateDto): Promise<ResponseDto> {
    return this.authService.signin(dto);
  }
}
