import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
  sellerId: number,
  createProductDto: CreateProductDto,
) {
    const product = await this.prisma.product.create({
  data: {
    ...createProductDto,
    sellerId,
  },
});

return product;

}


async findMyProducts(sellerId: number) {
  return this.prisma.product.findMany({
    where: {
      sellerId,
    },
  });
}
}
