import { Body, Controller, Post } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { CreateSellerDto } from './dto/create-seller.dto';

@Controller('api/v1/sellers')
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  @Post('register')
  async register(@Body() createSellerDto: CreateSellerDto) {
    return this.sellersService.register(createSellerDto);
  }
}
