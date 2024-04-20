import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categories } from "./categories.entity";

@Entity({name: 'products'})
export class Products {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({length:64})
    @Length(2,64)
    @IsNotEmpty()
    name:string;

    @Column({length:256})
    @Length(8,256)
    @IsNotEmpty()
    description:string;

    @Column({type:'decimal', precision:7, scale:2})
    @IsNotEmpty()
    price:number;

    @Column({length:512})
    @Length(32,512)
    @IsNotEmpty()
    photo:string;

    @ManyToOne(() => Categories, (categories) => categories.products, {
        onDelete:"CASCADE"
    })
    category: Categories
}
