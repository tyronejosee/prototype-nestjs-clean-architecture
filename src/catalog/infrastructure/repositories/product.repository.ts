import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductRepositoryInterface } from "@/catalog/domain/interfaces/product.repository.interface";
import { ProductModel } from "../models/product.model";
import { Product } from "@/catalog/domain/entities/product.entity";
import { UUID } from "@/catalog/domain/value-objects/uuid.value-object";
import { ProductPersistenceMapper } from "../mappers/product.mapper";

@Injectable()
export class ProductRepositoryImpl implements ProductRepositoryInterface {
  constructor(
    @InjectRepository(ProductModel)
    private readonly productRepository: Repository<ProductModel>,
  ) {}

  async save(product: Product): Promise<Product> {
    const model = ProductPersistenceMapper.toModel(product);
    const savedModel = await this.productRepository.save(model);
    return ProductPersistenceMapper.toDomain(savedModel);
  }

  async findById(id: UUID): Promise<Product | null> {
    const model = await this.productRepository.findOne({ where: { id: id.value } });
    if (!model) return null;

    return ProductPersistenceMapper.toDomain(model);
  }

  async findAll(): Promise<Product[]> {
    const models = await this.productRepository.find({ order: { createdAt: "DESC" } });

    return models.map((model) => ProductPersistenceMapper.toDomain(model));
  }

  async update(product: Product): Promise<Product> {
    const model = ProductPersistenceMapper.toModel(product);
    await this.productRepository.update(product.id.value, model);
    const updatedModel = await this.productRepository.findOne({ where: { id: product.id.value } });
    return ProductPersistenceMapper.toDomain(updatedModel);
  }

  async delete(id: UUID): Promise<void> {
    await this.productRepository.delete(id.value);
  }

  async exists(id: UUID): Promise<boolean> {
    const count = await this.productRepository.count({ where: { id: id.value } });
    return count > 0;
  }
}
