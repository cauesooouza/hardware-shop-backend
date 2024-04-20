import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { Categories } from "../database/entities/categories.entity";
import { DeleteResult } from "typeorm";

@Controller('/categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createNewCategory(@Body() category: Categories): Promise<Categories> {
        return this.categoriesService.create(category)
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    getAllCategories(): Promise<Categories[]> {
        return this.categoriesService.findAll()
    }

    @Get('/type/:type')
    @HttpCode(HttpStatus.OK)
    getCategoryByType(@Param('type') categoryType: string): Promise<Categories[]> {
        return this.categoriesService.findByType(categoryType)
    }

    @Get('/id/:id')
    @HttpCode(HttpStatus.OK)
    getCategoryById(@Param('id', ParseIntPipe) categoryId: number): Promise<Categories>{
        return this.categoriesService.findById(categoryId)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    updateCategory(@Body() category: Categories): Promise<Categories>{
        return this.categoriesService.update(category)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteCategory(@Param('id', ParseIntPipe)categoryId: number): Promise<DeleteResult>{
        return this.categoriesService.delete(categoryId)
    }

}