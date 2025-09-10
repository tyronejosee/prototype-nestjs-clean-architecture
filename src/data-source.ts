import "dotenv/config";
import { DataSource } from "typeorm";
import { ProductModel } from "./catalog/infrastructure/models/product.model";
import { CategoryModel } from "./catalog/infrastructure/models/category.model";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT!, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [CategoryModel, ProductModel],
  migrations: ["src/catalog/infrastructure/migrations/*.ts"],
  synchronize: false,
});
