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
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiImplicitParam } from '@nestjs/swagger/dist/decorators/api-implicit-param.decorator';
import { UserCreateDto } from '../auth/dto/user-create.dto';

@ApiTags('users')
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get all users' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    isArray: true,
    type: UserCreateDto,
  })
  @ApiBearerAuth()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Put(':userId')
  @ApiBody({ type: UserEditDto })
  @ApiImplicitParam({ name: 'userId', description: 'User Id', required: true })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully updated.',
    type: UserCreateDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  updateUser(@Param('userId') id: number, @Body() dto: UserEditDto) {
    return this.userService.updateUser(id, dto);
  }

  @Delete(':userId')
  @ApiBearerAuth()
  @ApiImplicitParam({ name: 'userId', description: 'User Id', required: true })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  deleteUser(@Param('userId') id: number) {
    return this.userService.deleteUser(id);
  }
}
