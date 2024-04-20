import { HttpException, HttpStatus, Inject } from "@nestjs/common";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Categories } from "../database/entities/categories.entity";

export class CategoriesService {
    constructor(@Inject('CATEGORIES_REPOSITORY') private categoriesRepository: Repository<Categories>) { }

    async create(category: Categories): Promise<Categories> {

        if (!category) {
            throw new HttpException("Cannot be empty", HttpStatus.BAD_REQUEST)
        }

        return this.categoriesRepository.save(category);
    }

    async findAll(): Promise<Categories[]> {
        return this.categoriesRepository.find({ relations: { products: true } });
    }

    async findByType(categoryType: string): Promise<Categories[]> {
        return this.categoriesRepository.find({ where: { type: ILike(`%${categoryType}%`) }, relations: { products: true } });
    }

    async findById(categoryId: number): Promise<Categories> {
        return this.categoriesRepository.findOne({ where: { id: categoryId }, relations: { products: true } })
    }

    protected findCategory(categoryId: number): Promise<Categories> {
        return this.categoriesRepository.findOne({ where: { id: categoryId } })
    }

    async update(category: Categories): Promise<Categories> {
        let findedCategory = await this.findCategory(category.id);

        if (!findedCategory || !category) {
            throw new HttpException("Category not found", HttpStatus.NOT_FOUND)
        }

        return this.categoriesRepository.save(category)
    }

    async delete(categoryId: number): Promise<DeleteResult> {
        let findedCategory = await this.findCategory(categoryId);

        if (!findedCategory) {
            throw new HttpException("Category not found", HttpStatus.NOT_FOUND)
        }

        return this.categoriesRepository.delete(findedCategory)
    }
}