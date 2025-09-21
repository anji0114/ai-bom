import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  getProducts(): Product[] {
    return [{ id: '1' }, { id: '2' }, { id: '3' }];
  }
}
