import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Domain
import { ProductFactory } from "./domain/factories/product.factory";

// Infrastructure
import { CategoryModel } from "./infrastructure/models/category.model";
import { CategoryRepositoryImpl } from "./infrastructure/repositories/category.repository";
import { ProductModel } from "./infrastructure/models/product.model";
import { ProductRepositoryImpl } from "./infrastructure/repositories/product.repository";

// Application
import { CreateCategoryUseCase } from "./application/use-cases/create-category.use-case";
import { GetAllCategoriesUseCase } from "./application/use-cases/get-all-categories.use-case";
import { CreateProductUseCase } from "./application/use-cases/create-product.use-case";
import { GetProductUseCase } from "./application/use-cases/get-product.use-case";
import { GetAllProductsUseCase } from "./application/use-cases/get-all-products.use-case";
import { UpdateProductUseCase } from "./application/use-cases/update-product.use-case";
import { DeleteProductUseCase } from "./application/use-cases/delete-product.use-case";

// Presentation
import { CategoryController } from "./presentation/controllers/category.controller";
import { ProductController } from "./presentation/controllers/product.controller";

@Module({
  imports: [TypeOrmModule.forFeature([CategoryModel, ProductModel])],
  controllers: [CategoryController, ProductController],
  providers: [
    // Domain
    ProductFactory,

    // Infrastructure
    {
      provide: "CategoryRepositoryInterface",
      useClass: CategoryRepositoryImpl,
    },
    {
      provide: "ProductRepositoryInterface",
      useClass: ProductRepositoryImpl,
    },

    // Application
    CreateCategoryUseCase,
    GetAllCategoriesUseCase,

    CreateProductUseCase,
    GetProductUseCase,
    GetAllProductsUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
  ],
})
export class CatalogModule {}
