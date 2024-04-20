import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Products } from "../database/entities/products.entity";
import { DeleteResult } from "typeorm";

@Controller('/products')
export class ProductsController {
    constructor(private readonly productService: ProductsService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createNewProduct(@Body() product: Products): Promise<Products> {
        return this.productService.create(product);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    getAllProducts(): Promise<Products[]> {
        return this.productService.findAll();
    }

    @Get('/id/:id')
    @HttpCode(HttpStatus.OK)
    getProductById(@Param('id', ParseIntPipe) productId: number): Promise<Products> {
        return this.productService.findById(productId);
    }

    @Get('/name/:name')
    @HttpCode(HttpStatus.OK)
    getProductByName(@Param('name') productName: string): Promise<Products[]> {
        return this.productService.findByName(productName);
    }

    @Get('/description/:description')
    @HttpCode(HttpStatus.OK)
    getProductByDescription(@Param('description') productDescription: string): Promise<Products[]> {
        return this.productService.findByDescription(productDescription);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    updateProduct(@Body() product: Products): Promise<Products> {
        return this.productService.update(product);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteProduct(@Param('id', ParseIntPipe) productId: number): Promise<DeleteResult> {
        return this.productService.delete(productId);
    }

}