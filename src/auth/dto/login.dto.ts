import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    default: 'stephen@gmail.com',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    default: 'chuong123456',
  })
  @IsNotEmpty()
  password: string;
}
