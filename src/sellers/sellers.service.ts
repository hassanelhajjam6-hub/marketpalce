import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SellersService {
  constructor(private readonly prisma: PrismaService) {}

  async register(createSellerDto: CreateSellerDto) {
    const existingSeller = await this.prisma.seller.findUnique({
      where: {
        email: createSellerDto.email,
      },
    });

    

    if (existingSeller) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(createSellerDto.password, 10);

    const seller = await this.prisma.seller.create({
      data: {
        business_name: createSellerDto.business_name,
        email: createSellerDto.email,
        password: hashedPassword,
        phone: createSellerDto.phone,
      },
      select: {
        id: true,
        business_name: true,
        email: true,
        phone: true,
        createdAt: true,
      },
    });

    return seller;
  }
  async findByEmail(email: string) {
  return this.prisma.seller.findUnique({
    where: {
      email,
    },
  });
}
}
