
import { Controller, Get, Param, Body, Query, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { IProduct } from './product.model';
import { Request } from 'express';

@Controller('api')
export class ProductController {
    constructor(
        private readonly productService: ProductService,
    ) { }

    @Get()
    find_All_Products_Controller(): Promise<IProduct[]> {
        return this.productService.find_All_Products_Service();
    }

    @Get('/front')
    get_And_Save_All_From_API_Controller(): Promise<any> {
        console.log('Bika ston controller!');
        return this.productService.get_And_Save_All_From_API_Service_New_Logic();
    }

    @Get('product/:gender/:category/:subcategory')
    get_Specific_Products_Controller(

        @Req() request: Request,

    ) {
        console.log('Bika ston neo controller!');

        console.log('request.params: ', request.params);
        console.log('request.query: ', request.query);
        return this.productService.Get_Specific_Products_Service(request.params, request.query);
    }

    @Get('/:id')
    find_One_Product_By_Id_Controller(@Param('id') id: string): Promise<IProduct> {
        return this.productService.find_One_Product_By_Id_Service(id);
    }
}
