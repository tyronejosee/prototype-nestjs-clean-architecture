import { Injectable, Inject } from "@nestjs/common";
import { CatalogRepositoryInterface } from "../../domain/interfaces/catalog.repository.interface";
import { CatalogItemFactory } from "../../domain/factories/catalog-item.factory";
import { CatalogItem } from "../../domain/entities/catalog-item.entity";

export interface CreateCatalogItemRequest {
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
}

export interface CreateCatalogItemResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class CreateCatalogItemUseCase {
  constructor(
    @Inject("CatalogRepositoryInterface")
    private readonly catalogRepository: CatalogRepositoryInterface,
    private readonly catalogItemFactory: CatalogItemFactory,
  ) {}

  async execute(request: CreateCatalogItemRequest): Promise<CreateCatalogItemResponse> {
    try {
      const catalogItem = this.catalogItemFactory.create({
        name: request.name,
        description: request.description,
        price: request.price,
        currency: request.currency,
        category: request.category,
      });

      const savedItem = await this.catalogRepository.save(catalogItem);

      return this.mapToResponse(savedItem);
    } catch (error) {
      throw new Error(`Failed to create catalog item: ${error.message}`);
    }
  }

  private mapToResponse(catalogItem: CatalogItem): CreateCatalogItemResponse {
    return {
      id: catalogItem.id.value,
      name: catalogItem.name,
      description: catalogItem.description,
      price: catalogItem.price.amount,
      currency: catalogItem.price.currency,
      category: catalogItem.category.name,
      isActive: catalogItem.isActive,
      createdAt: catalogItem.createdAt,
      updatedAt: catalogItem.updatedAt,
    };
  }
}
