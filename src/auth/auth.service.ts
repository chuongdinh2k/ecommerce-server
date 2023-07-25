import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { comparePassword } from 'src/core/utils/hashedPassword';
import { UserService } from 'src/user/user.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import {
  IGenerateTokenProps,
  JwtPayload,
} from './interfaces/jwtPayload.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;
    const user = await this.userService.findOne({ email });
    if (!user) {
      throw new HttpException(
        'Email or password is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }

    const comparedPassword = await comparePassword(user.password, password);
    if (!comparedPassword) {
      throw new HttpException(
        'Email or password is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }
    const token = await this._generateToken({ email, id: user.id }, 900);

    return {
      user,
      token: token,
    };
  }

  signup(createAuthDto: CreateAuthDto) {
    return this.userService.create(createAuthDto);
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    const { email } = payload;
    const user = await this.userService.findOne({ email });
    if (!user) {
      throw new HttpException('Unauthorized access', HttpStatus.FORBIDDEN);
    }
    return user;
  }

  private async _generateToken(
    generateToken: IGenerateTokenProps,
    exp?: any,
  ): Promise<string> {
    const { email, id } = generateToken;
    const defaultExpiresIn = this.configService.get<'JWT_EXPIRES'>;
    const expiresIn = exp || defaultExpiresIn;
    const user: JwtPayload = { email, id };
    const accessToken = this.jwtService.sign(user, { expiresIn: expiresIn });
    return accessToken;
  }
}
