import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import slugify from 'slugify';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductSchema } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<typeof ProductSchema>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const {
      name,
      price,
      number_available,
      thumbnail_url,
      main_url,
      color,
      size,
    } = createProductDto;

    const product = await this.findOne({ name });
    if (product) {
      throw new HttpException(
        `Product ${name} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const slug = slugify(name, '-');

    const newProduct = new this.productModel({
      name,
      price,
      number_available,
      thumbnail_url,
      main_url,
      color,
      size,
      slug,
    });

    return newProduct.save();
  }

  async findAll(): Promise<(typeof ProductSchema)[]> {
    return this.productModel.find();
  }

  findOne(options: object): Promise<Product> {
    return this.productModel.findOne(options);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
