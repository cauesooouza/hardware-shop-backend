import { DataSource } from "typeorm"

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const datasource = new DataSource({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'root',
                database: 'db_hardware_shop',
                entities: [
                    __dirname + '/entities/*.entity{.ts,.js}'
                ],
                synchronize: true
            });
            
            return datasource.initialize();
        }
    }
]