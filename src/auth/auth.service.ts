import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { UserCreateDto, ResponseDto } from './dto/user-create.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async signup(dto: UserCreateDto): Promise<ResponseDto> {
    const hash = await argon.hash(dto.password);
    dto.password = hash;
    const user = await this.userService.create(dto);
    return this.signToken(user.id, user.email);
  }

  async signin(dto: UserCreateDto): Promise<ResponseDto> {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) throw new ForbiddenException('Credentials incorrect');
    const pwMatches = await argon.verify(user.password, dto.password);

    if (!pwMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }
    return this.signToken(user.id, user.email);
  }

  async signToken(userId: number, email: string): Promise<ResponseDto> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15h',
      secret,
    });
    return {
      access_token: token,
      id: userId,
    };
  }
}
