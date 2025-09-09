import { Injectable, Inject } from "@nestjs/common";
import { CatalogRepositoryInterface } from "../../domain/interfaces/catalog.repository.interface";
import { CatalogId } from "../../domain/value-objects/catalog-id.value-object";
import { CatalogItem } from "../../domain/entities/catalog-item.entity";

export interface GetCatalogItemRequest {
  id: string;
}

export interface GetCatalogItemResponse {
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
export class GetCatalogItemUseCase {
  constructor(
    @Inject("CatalogRepositoryInterface")
    private readonly catalogRepository: CatalogRepositoryInterface,
  ) {}

  async execute(request: GetCatalogItemRequest): Promise<GetCatalogItemResponse | null> {
    try {
      const catalogId = new CatalogId(request.id);
      const catalogItem = await this.catalogRepository.findById(catalogId);

      if (!catalogItem) {
        return null;
      }

      return this.mapToResponse(catalogItem);
    } catch (error) {
      throw new Error(`Failed to get catalog item: ${error.message}`);
    }
  }

  private mapToResponse(catalogItem: CatalogItem): GetCatalogItemResponse {
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
