import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
// import { UserCreateDto } from './dto/user-create.dto';
import { UserEditDto } from './dto/user-edit.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // @Post('/create')
  // create(@Body() dto: UserCreateDto) {
  //   return this.userService.create(dto);
  // }

  @Get('/users')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() dto: UserEditDto) {
    return this.userService.updateUser(id, dto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
