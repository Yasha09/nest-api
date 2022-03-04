import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEditDto } from './dto/user-edit.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/users')
  @ApiBearerAuth()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Put(':id')
  @ApiCreatedResponse({ description: 'User Update' })
  @ApiBody({ type: UserEditDto })
  @ApiBearerAuth()
  updateUser(@Param('id') id: number, @Body() dto: UserEditDto) {
    return this.userService.updateUser(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
