import { Injectable, Inject } from "@nestjs/common";
import { CatalogRepositoryInterface } from "../../domain/interfaces/catalog.repository.interface";
import { CatalogId } from "../../domain/value-objects/catalog-id.value-object";
import { CatalogItem } from "../../domain/entities/catalog-item.entity";

export interface UpdateCatalogItemRequest {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  currency?: string;
  category?: string;
}

export interface UpdateCatalogItemResponse {
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
export class UpdateCatalogItemUseCase {
  constructor(
    @Inject("CatalogRepositoryInterface")
    private readonly catalogRepository: CatalogRepositoryInterface,
  ) {}

  async execute(request: UpdateCatalogItemRequest): Promise<UpdateCatalogItemResponse | null> {
    try {
      const catalogId = new CatalogId(request.id);
      const catalogItem = await this.catalogRepository.findById(catalogId);

      if (!catalogItem) {
        return null;
      }

      // Update basic info if provided
      if (request.name !== undefined || request.description !== undefined) {
        catalogItem.updateInfo(
          request.name ?? catalogItem.name,
          request.description ?? catalogItem.description,
        );
      }

      // Update price if provided
      if (request.price !== undefined || request.currency !== undefined) {
        catalogItem.updatePrice(
          request.price ?? catalogItem.price.amount,
          request.currency ?? catalogItem.price.currency,
        );
      }

      // Update category if provided
      if (request.category !== undefined) {
        catalogItem.updateCategory(request.category);
      }

      catalogItem.validate();
      const updatedItem = await this.catalogRepository.update(catalogItem);

      return this.mapToResponse(updatedItem);
    } catch (error) {
      throw new Error(`Failed to update catalog item: ${error.message}`);
    }
  }

  private mapToResponse(catalogItem: CatalogItem): UpdateCatalogItemResponse {
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
