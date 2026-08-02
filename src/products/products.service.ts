import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

async create(
  sellerId: number,
  createProductDto: CreateProductDto,
  file?: Express.Multer.File,
) {
  const imageUrl = file
    ? `/uploads/products/${file.filename}`
    : null;

  return this.prisma.product.create({
    data: {
      title: createProductDto.title,
      description: createProductDto.description,
      price: createProductDto.price,
      stock: createProductDto.stock,
      sellerId,
      imageUrl,
    },
  });
}

async findMyProducts(sellerId: number) {
  return this.prisma.product.findMany({
    where: {
      sellerId,
    },
  });
}

async findAll() {
  return this.prisma.product.findMany();
}

async update(
  id: number,
  sellerId: number,
  updateProductDto: UpdateProductDto,
) {
  const product = await this.prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    throw new NotFoundException('Product not found');
  }

  if (product.sellerId !== sellerId) {
    throw new ForbiddenException(
      'You are not allowed to update this product',
    );
  }

  return this.prisma.product.update({
    where: { id },
    data: {
      ...updateProductDto,
    },
  });
}

async delete(id: number, sellerId: number) {
  const product = await this.prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    throw new NotFoundException('Product not found');
  }

  if (product.sellerId !== sellerId) {
    throw new ForbiddenException(
      'You are not allowed to delete this product',
    );
  }

  return this.prisma.product.delete({
    where: {
      id,
    },
  });
}
}
