import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Repository, ILike, DeleteResult, Between, LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { Products } from "../database/entities/products.entity";

@Injectable()
export class ProductsService {
    constructor(@Inject('PRODUCTS_REPOSITORY') private productsRepository: Repository<Products>) { }

    async create(product: Products): Promise<Products> {

        if (!product) {
            throw new HttpException("Cannot be empty", HttpStatus.BAD_REQUEST)
        }

        return this.productsRepository.save(product)
    }

    async findAll(): Promise<Products[]> {
        return this.productsRepository.find({ relations: { category: true } });
    }

    async findByName(productName: string): Promise<Products[]> {
        return this.productsRepository.find({ where: { name: ILike(`%${productName}%`) }, relations: { category: true } })
    }

    async findById(productId: number): Promise<Products> {
        return this.productsRepository.findOne({ where: { id: productId }, relations: { category: true } });
    }

    protected findProduct(productId: number): Promise<Products> {
        return this.productsRepository.findOne({ where: { id: productId } })
    }

    async findByDescription(productDescription: string): Promise<Products[]> {
        return this.productsRepository.find({ where: { description: ILike(`%${productDescription}%`) }, relations: { category: true } })
    }

    async findByPriceBetween(minPrice: number, maxPrice: number): Promise<Products[]> {
        return this.productsRepository.find({ where: { price: Between(minPrice, maxPrice) }, relations: { category: true } })
    }

    async findByPriceLessThan(price: number): Promise<Products[]> {
        return this.productsRepository.find({ where: { price: LessThanOrEqual(price) }, relations: { category: true } })
    }

    async findByPriceMoreThan(price:number):Promise<Products[]>{
        return this.productsRepository.find({ where: { price: MoreThanOrEqual(price) }, relations: { category: true } })
    }

    async update(product: Products): Promise<Products> {
        let findProduct = await this.findProduct(product.id);

        if (!findProduct) {
            throw new HttpException("Product not found", HttpStatus.NOT_FOUND);
        }

        return this.productsRepository.save(product);
    }

    async delete(productId: number): Promise<DeleteResult> {
        let findProduct = await this.findProduct(productId);

        if (!findProduct) {
            throw new HttpException("Product not found", HttpStatus.NOT_FOUND);
        }

        return this.productsRepository.delete(findProduct);
    }
}