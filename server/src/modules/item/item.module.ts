import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemResolver } from './item.resolver';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [ItemService, ItemResolver],
  exports: [ItemService],
  imports: [AuthModule],
})
export class ItemModule {}
