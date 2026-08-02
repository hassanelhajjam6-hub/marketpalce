import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { SellersModule } from './sellers/sellers.module';
import { ProductsModule } from './products/products.module';

import { MarketplaceModule } from './marketplace/marketplace.module';

@Module({
  imports: [PrismaModule, AuthModule, SellersModule, ProductsModule, MarketplaceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
