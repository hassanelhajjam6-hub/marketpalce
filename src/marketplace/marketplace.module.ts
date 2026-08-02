import { Module } from '@nestjs/common';
import { MarketplaceController } from './marketplace.controller';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [MarketplaceController],
})
export class MarketplaceModule {}