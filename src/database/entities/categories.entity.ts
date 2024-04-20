import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./products.entity";

@Entity({ name: 'categories' })
export class Categories {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 64 })
    @Length(2, 64)
    @IsNotEmpty()
    type: string;

    @OneToMany(() => Products, (products) => products.category)
    products: Products[]
}