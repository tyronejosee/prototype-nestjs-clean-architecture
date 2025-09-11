import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Infrastructure
import { CategoryModel } from "./infrastructure/models/category.model";
import { CategoryRepositoryImpl } from "./infrastructure/repositories/category.repository";
import { ProductModel } from "./infrastructure/models/product.model";
import { ProductRepositoryImpl } from "./infrastructure/repositories/product.repository";

// Presentation
import { CategoryController } from "./presentation/controllers/category.controller";
import { ProductController } from "./presentation/controllers/product.controller";

// Providers
import {
  CreateProductUseCaseProvider,
  DeleteProductUseCaseProvider,
  GetAllProductsUseCaseProvider,
  GetProductUseCaseProvider,
  UpdateProductUseCaseProvider,
} from "./presentation/providers/product.provider";
import {
  CreateCategoryUseCaseProvider,
  GetAllCategoriesUseCaseProvider,
} from "./presentation/providers/category.provider";

@Module({
  imports: [TypeOrmModule.forFeature([CategoryModel, ProductModel])],
  controllers: [CategoryController, ProductController],
  providers: [
    // Infrastructure
    {
      provide: "CategoryRepositoryInterface",
      useClass: CategoryRepositoryImpl,
    },
    {
      provide: "ProductRepositoryInterface",
      useClass: ProductRepositoryImpl,
    },

    // Providers
    CreateCategoryUseCaseProvider,
    GetAllCategoriesUseCaseProvider,
    CreateProductUseCaseProvider,
    GetProductUseCaseProvider,
    GetAllProductsUseCaseProvider,
    UpdateProductUseCaseProvider,
    DeleteProductUseCaseProvider,
  ],
})
export class CatalogModule {}
