import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UserEditDto } from './dto/user-edit.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOne(id);
  }

  findByEmail(email: string) {
    return this.repo.findOne({ email });
  }

  async create(dto: UserDto): Promise<User> {
    return await this.repo.save(dto);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.repo.find();
  }

  async updateUser(userId: number, dto: UserEditDto): Promise<User> {
    const user = await this.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, dto);
    return this.repo.save(user);
  }

  async deleteUser(userId: number): Promise<User> {
    const user = await this.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.repo.remove(user);
  }
}
