import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CatalogRepositoryInterface } from "../../domain/interfaces/catalog.repository.interface";
import { CatalogItem } from "../../domain/entities/catalog-item.entity";
import { CatalogId } from "../../domain/value-objects/catalog-id.value-object";
import { CatalogItemModel } from "../models/catalog-item.model";
import { CatalogItemFactory } from "../../domain/factories/catalog-item.factory";

@Injectable()
export class CatalogRepositoryImpl implements CatalogRepositoryInterface {
  constructor(
    @InjectRepository(CatalogItemModel)
    private readonly catalogItemRepository: Repository<CatalogItemModel>,
    private readonly catalogItemFactory: CatalogItemFactory,
  ) {}

  async save(catalogItem: CatalogItem): Promise<CatalogItem> {
    const model = this.mapToModel(catalogItem);
    const savedModel = await this.catalogItemRepository.save(model);
    return this.mapToDomain(savedModel);
  }

  async findById(id: CatalogId): Promise<CatalogItem | null> {
    const model = await this.catalogItemRepository.findOne({
      where: { id: id.value },
    });

    if (!model) {
      return null;
    }

    return this.mapToDomain(model);
  }

  async findAll(): Promise<CatalogItem[]> {
    const models = await this.catalogItemRepository.find({
      order: { createdAt: "DESC" },
    });

    return models.map((model) => this.mapToDomain(model));
  }

  async update(catalogItem: CatalogItem): Promise<CatalogItem> {
    const model = this.mapToModel(catalogItem);
    await this.catalogItemRepository.update(catalogItem.id.value, model);

    const updatedModel = await this.catalogItemRepository.findOne({
      where: { id: catalogItem.id.value },
    });

    return this.mapToDomain(updatedModel);
  }

  async delete(id: CatalogId): Promise<void> {
    await this.catalogItemRepository.delete(id.value);
  }

  async exists(id: CatalogId): Promise<boolean> {
    const count = await this.catalogItemRepository.count({
      where: { id: id.value },
    });
    return count > 0;
  }

  private mapToModel(catalogItem: CatalogItem): Partial<CatalogItemModel> {
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

  private mapToDomain(model: CatalogItemModel): CatalogItem {
    return this.catalogItemFactory.createFromPersistence(
      model.id,
      model.name,
      model.description,
      model.price,
      model.currency,
      model.category,
      model.isActive,
      model.createdAt,
      model.updatedAt,
    );
  }
}
