import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserSchema } from './entities/user.entity';
import { Model } from 'mongoose';
import { hashPassword } from 'src/core/utils/hashedPassword';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModal: Model<typeof UserSchema>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { email, first_name, last_name, password } = createUserDto;
    const user = await this.findOne({ email });

    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const newPasswordHashed = await hashPassword(password);

    const newUser = new this.userModal({
      email,
      first_name,
      last_name,
      password: newPasswordHashed,
    });

    return newUser.save();
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(options: object): Promise<User> {
    return this.userModal.findOne(options);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
