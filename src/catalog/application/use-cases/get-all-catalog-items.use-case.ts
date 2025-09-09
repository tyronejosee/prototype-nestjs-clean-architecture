import { Injectable, Inject } from "@nestjs/common";
import { CatalogRepositoryInterface } from "../../domain/interfaces/catalog.repository.interface";
import { CatalogItem } from "../../domain/entities/catalog-item.entity";

export interface GetAllCatalogItemsResponse {
  items: {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    category: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }[];
  total: number;
}

@Injectable()
export class GetAllCatalogItemsUseCase {
  constructor(
    @Inject("CatalogRepositoryInterface")
    private readonly catalogRepository: CatalogRepositoryInterface,
  ) {}

  async execute(): Promise<GetAllCatalogItemsResponse> {
    try {
      const catalogItems = await this.catalogRepository.findAll();

      return {
        items: catalogItems.map(this.mapToResponseItem),
        total: catalogItems.length,
      };
    } catch (error) {
      throw new Error(`Failed to get all catalog items: ${error.message}`);
    }
  }

  private mapToResponseItem(catalogItem: CatalogItem) {
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
