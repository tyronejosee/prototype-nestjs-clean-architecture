import { Injectable, Inject } from "@nestjs/common";
import { CatalogRepositoryInterface } from "../../domain/interfaces/catalog.repository.interface";
import { CatalogId } from "../../domain/value-objects/catalog-id.value-object";

export interface DeleteCatalogItemRequest {
  id: string;
}

@Injectable()
export class DeleteCatalogItemUseCase {
  constructor(
    @Inject("CatalogRepositoryInterface")
    private readonly catalogRepository: CatalogRepositoryInterface,
  ) {}

  async execute(request: DeleteCatalogItemRequest): Promise<boolean> {
    try {
      const catalogId = new CatalogId(request.id);
      const exists = await this.catalogRepository.exists(catalogId);

      if (!exists) {
        return false;
      }

      await this.catalogRepository.delete(catalogId);
      return true;
    } catch (error) {
      throw new Error(`Failed to delete catalog item: ${error.message}`);
    }
  }
}
