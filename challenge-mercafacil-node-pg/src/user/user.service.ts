import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptAdapter } from 'src/shared/cryptography/bcrypt-adapter/bcrypt-adapter';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly bcryptAdapter: BcryptAdapter,
  ) {}
  async create(createUserDto: CreateUserDto) {
    let user = await this.findByEmail(createUserDto.email);

    if (user) {
      throw new ConflictException(
        `User with email: ${createUserDto.email} already exists`,
      );
    }

    user = await this.repository.save({
      ...createUserDto,
      password: await this.bcryptAdapter.hash(createUserDto.password),
    });
    return user;
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    return await this.repository.findOne({ where: { id } });
  }

  async findByEmail(email: string) {
    return await this.repository.findOne({ where: { email } });
  }
}
