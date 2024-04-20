import { DataSource } from "typeorm";
import { Categories } from "../database/entities/categories.entity";

export const categoriesProviders = [
    {
        provide: 'CATEGORIES_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Categories),
        inject: ['DATA_SOURCE']
    }
]