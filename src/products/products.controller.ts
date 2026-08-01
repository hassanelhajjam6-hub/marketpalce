import { Body, Controller, Post,Get, Req, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/v1/sellers/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createProductDto: CreateProductDto,
    @Req() req,
  ) {
    return this.productsService.create(
      req.user.sellerId,
      createProductDto,
    );
  }

@Get()
@UseGuards(JwtAuthGuard)
async findMyProducts(@Req() req) {
  return this.productsService.findMyProducts(req.user.sellerId);
}
}
