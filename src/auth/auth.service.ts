import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SellersService } from '../sellers/sellers.service';
import { LoginSellerDto } from '../sellers/dto/login-seller.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly sellersService: SellersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginSellerDto) {
    const seller = await this.sellersService.findByEmail(loginDto.email);

    if (!seller) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordMatch = await bcrypt.compare(
      loginDto.password,
      seller.password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = {
      sub: seller.id,
      email: seller.email,
    };

    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
      seller: {
        id: seller.id,
        business_name: seller.business_name,
        email: seller.email,
        phone: seller.phone,
      },
    };
  }
}
