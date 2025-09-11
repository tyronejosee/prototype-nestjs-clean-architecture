import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "@/catalog/domain/entities/category.entity";
import { UUID } from "@/catalog/domain/value-objects/uuid.value-object";
import { CategoryModel } from "../models/category.model";
import { CategoryRepositoryInterface } from "@/catalog/domain/interfaces/category.repository.interface";
import { CategoryPersistenceMapper } from "../mappers/category.mapper";

@Injectable()
export class CategoryRepositoryImpl implements CategoryRepositoryInterface {
  constructor(
    @InjectRepository(CategoryModel)
    private readonly categoryRepository: Repository<CategoryModel>,
  ) {}

  async save(category: Category): Promise<Category> {
    const model = CategoryPersistenceMapper.toModel(category);
    const saved = await this.categoryRepository.save(model);
    return CategoryPersistenceMapper.toDomain(saved);
  }

  async findById(id: UUID): Promise<Category | null> {
    const model = await this.categoryRepository.findOne({ where: { id: id.value } });
    return model ? CategoryPersistenceMapper.toDomain(model) : null;
  }

  async findAll(): Promise<Category[]> {
    const models = await this.categoryRepository.find();
    return models.map((model) => CategoryPersistenceMapper.toDomain(model));
  }

  async update(category: Category): Promise<Category> {
    const model = CategoryPersistenceMapper.toModel(category);
    await this.categoryRepository.update(category.id.value, model);
    return category;
  }

  async delete(id: UUID): Promise<void> {
    await this.categoryRepository.delete(id.value);
  }

  async exists(id: UUID): Promise<boolean> {
    const count = await this.categoryRepository.count({ where: { id: id.value } });
    return count > 0;
  }
}
