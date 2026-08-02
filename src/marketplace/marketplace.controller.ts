import { Controller, Get } from '@nestjs/common';
import { ProductsService } from '../products/products.service';

@Controller('api/v1/products')
export class MarketplaceController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }
}