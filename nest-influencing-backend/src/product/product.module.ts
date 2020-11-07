import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './product.model';
import { Categories } from 'src/categories/categories';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema, collection: 'product' }]),
    Categories,
  ],
  providers: [ProductService, Categories],
  controllers: [ProductController],
  exports: [ProductService]
})
export class ProductModule { }
