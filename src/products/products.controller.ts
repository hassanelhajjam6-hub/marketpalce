import {
  Body,
  Controller,
  Post,
  Get,
  Req,
  UseGuards,
  Delete,
  Put,
  Param,
  ParseIntPipe,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import type { Express } from 'express';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/v1/sellers/products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/uploads/products',
        filename: (req, file, cb) => {
          const uniqueName =
            Date.now() + extname(file.originalname);

          cb(null, uniqueName);
        },
      }),
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
    @Req() req,
  ) {
    return this.productsService.create(
      req.user.sellerId,
      createProductDto,
      file,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findMyProducts(@Req() req) {
    return this.productsService.findMyProducts(
      req.user.sellerId,
    );
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
    @Req() req,
  ) {
    return this.productsService.update(
      id,
      req.user.sellerId,
      updateProductDto,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Req() req,
  ) {
    return this.productsService.delete(
      id,
      req.user.sellerId,
    );
  }
}