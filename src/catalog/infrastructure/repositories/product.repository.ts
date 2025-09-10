import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductRepositoryInterface } from "@/catalog/domain/interfaces/product.repository.interface";
import { ProductModel } from "../models/product.model";
import { ProductFactory } from "@/catalog/domain/factories/product.factory";
import { Product } from "@/catalog/domain/entities/product.entity";
import { UUID } from "@/catalog/domain/value-objects/uuid.value-object";

@Injectable()
export class ProductRepositoryImpl implements ProductRepositoryInterface {
  constructor(
    @InjectRepository(ProductModel)
    private readonly productRepository: Repository<ProductModel>,
    private readonly productFactory: ProductFactory,
  ) {}

  async save(product: Product): Promise<Product> {
    const model = this.mapToModel(product);
    const savedModel = await this.productRepository.save(model);
    return this.mapToDomain(savedModel);
  }

  async findById(id: UUID): Promise<Product | null> {
    const model = await this.productRepository.findOne({
      where: { id: id.value },
    });

    if (!model) return null;

    return this.mapToDomain(model);
  }

  async findAll(): Promise<Product[]> {
    const models = await this.productRepository.find({
      order: { createdAt: "DESC" },
    });

    return models.map((model) => this.mapToDomain(model));
  }

  async update(product: Product): Promise<Product> {
    const model = this.mapToModel(product);
    await this.productRepository.update(product.id.value, model);

    const updatedModel = await this.productRepository.findOne({ where: { id: product.id.value } });

    return this.mapToDomain(updatedModel);
  }

  async delete(id: UUID): Promise<void> {
    await this.productRepository.delete(id.value);
  }

  async exists(id: UUID): Promise<boolean> {
    const count = await this.productRepository.count({ where: { id: id.value } });
    return count > 0;
  }

  private mapToModel(product: Product): Partial<ProductModel> {
    return {
      id: product.id.value,
      name: product.name,
      description: product.description,
      price: product.price.amount,
      currency: product.price.currency,
      categoryId: product.categoryId,
      isActive: product.isActive,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }

  private mapToDomain(model: ProductModel): Product {
    return this.productFactory.createFromPersistence(
      model.id,
      model.name,
      model.description,
      model.price,
      model.currency,
      model.categoryId,
      model.isActive,
      model.createdAt,
      model.updatedAt,
    );
  }
}
