import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [ProductService, ProductResolver],
  exports: [ProductService],
  imports: [AuthModule],
})
export class ProductModule {}
