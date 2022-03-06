import { UserCreateDto } from './user-create.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UserEditDto extends PartialType(UserCreateDto) {}
