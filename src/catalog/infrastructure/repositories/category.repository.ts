import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "@/catalog/domain/entities/category.entity";
import { UUID } from "@/catalog/domain/value-objects/uuid.value-object";
import { CategoryModel } from "../models/category.model";
import { CategoryRepositoryInterface } from "@/catalog/domain/interfaces/catagory.repository.interface";

@Injectable()
export class CategoryRepositoryImpl implements CategoryRepositoryInterface {
  constructor(
    @InjectRepository(CategoryModel)
    private readonly categoryRepository: Repository<CategoryModel>,
  ) {}

  async save(category: Category): Promise<Category> {
    const model = this.mapToModel(category);
    const saved = await this.categoryRepository.save(model);
    return this.mapToDomain(saved);
  }

  async findById(id: UUID): Promise<Category | null> {
    const model = await this.categoryRepository.findOne({ where: { id: id.value } });
    return model ? this.mapToDomain(model) : null;
  }

  async findAll(): Promise<Category[]> {
    const models = await this.categoryRepository.find();
    return models.map(this.mapToDomain);
  }

  async update(category: Category): Promise<Category> {
    await this.categoryRepository.update(category.id.value, this.mapToModel(category));
    const updated = await this.categoryRepository.findOne({ where: { id: category.id.value } });
    return this.mapToDomain(updated);
  }

  async delete(id: UUID): Promise<void> {
    await this.categoryRepository.delete(id.value);
  }

  async exists(id: UUID): Promise<boolean> {
    const count = await this.categoryRepository.count({ where: { id: id.value } });
    return count > 0;
  }

  private mapToModel(category: Category): Partial<CategoryModel> {
    return {
      id: category.id.value,
      name: category.name,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }

  private mapToDomain(model: CategoryModel): Category {
    return Category.fromPersistence(model.id, model.name, model.createdAt, model.updatedAt);
  }
}
