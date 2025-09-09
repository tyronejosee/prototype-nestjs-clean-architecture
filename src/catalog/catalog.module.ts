import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Domain
import { CatalogItemFactory } from "./domain/factories/catalog-item.factory";

// Infrastructure
import { CatalogItemModel } from "./infrastructure/models/catalog-item.model";
import { CatalogRepositoryImpl } from "./infrastructure/repositories/catalog.repository";

// Application
import { CreateCatalogItemUseCase } from "./application/use-cases/create-catalog-item.use-case";
import { GetCatalogItemUseCase } from "./application/use-cases/get-catalog-item.use-case";
import { GetAllCatalogItemsUseCase } from "./application/use-cases/get-all-catalog-items.use-case";
import { UpdateCatalogItemUseCase } from "./application/use-cases/update-catalog-item.use-case";
import { DeleteCatalogItemUseCase } from "./application/use-cases/delete-catalog-item.use-case";

// Presentation
import { CatalogController } from "./presentation/controllers/catalog.controller";

@Module({
  imports: [TypeOrmModule.forFeature([CatalogItemModel])],
  controllers: [CatalogController],
  providers: [
    // Domain
    CatalogItemFactory,

    // Infrastructure
    {
      provide: "CatalogRepositoryInterface",
      useClass: CatalogRepositoryImpl,
    },

    // Application
    CreateCatalogItemUseCase,
    GetCatalogItemUseCase,
    GetAllCatalogItemsUseCase,
    UpdateCatalogItemUseCase,
    DeleteCatalogItemUseCase,
  ],
})
export class CatalogModule {}
