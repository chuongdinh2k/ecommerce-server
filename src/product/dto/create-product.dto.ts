import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ColorEnum, SizeEnum } from '../interfaces';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  number_available: number;

  @ApiProperty()
  @IsNotEmpty()
  thumbnail_url: string;

  @ApiProperty()
  @IsNotEmpty()
  main_url: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(ColorEnum, { each: true })
  color: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(SizeEnum, { each: true })
  size: string[];
}
