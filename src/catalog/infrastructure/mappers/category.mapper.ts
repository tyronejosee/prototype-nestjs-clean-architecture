import { Category } from "@/catalog/domain/entities/category.entity";
import { CategoryModel } from "../models/category.model";

export class CategoryPersistenceMapper {
  static toModel(category: Category): CategoryModel {
    return {
      id: category.id.value,
      name: category.name,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    } as CategoryModel;
  }

  static toDomain(model: CategoryModel): Category {
    return Category.fromPersistence(model.id, model.name, model.createdAt, model.updatedAt);
  }
}
