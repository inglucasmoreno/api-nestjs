import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Query } from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService){}

    @Post('/create')
    async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO) {
        const product = await this.productService.createProduct(createProductDTO);
        res.status(HttpStatus.OK).json({
            message: 'Producto creado correctamente',
            product
        });
    }

    @Get('/')
    async getProducts(@Res() res) {
        const products = await this.productService.getProducts();
        res.status(HttpStatus.OK).json({
            products
        });
    }

    @Get('/:id')
    async getProduct(@Res() res, @Param('id') id) {
        const product = await this.productService.getProduct(id);
        if(!product) throw new NotFoundException('El producto no existe');
        res.status(HttpStatus.OK).json({
            product
        });
    }


    @Put('/:id')
    async updateProduct(@Res() res, @Body() createProductDTO: CreateProductDTO, @Param('id') id) {
        const product = await this.productService.updateProduct(id, createProductDTO);
        if(!product) throw new NotFoundException('El producto no existe');
        res.status(HttpStatus.OK).json({
            product
        });
    }

    @Delete('/delete')
    async deleteProduct(@Res() res, @Query('productID') productID ) {
        const product = await this.productService.deleteProduct(productID);
        if(!product) throw new NotFoundException('El producto no existe');
        res.status(HttpStatus.OK).json({
            product
        });
    }

}
