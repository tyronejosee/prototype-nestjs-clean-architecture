import { Injectable, Inject } from "@nestjs/common";
import { Category } from "@/catalog/domain/entities/category.entity";
import { CategoryRepositoryInterface } from "@/catalog/domain/interfaces/catagory.repository.interface";

export interface CreateCategoryRequest {
  name: string;
}

export interface CreateCategoryResponse {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    @Inject("CategoryRepositoryInterface")
    private readonly categoryRepository: CategoryRepositoryInterface,
  ) {}

  async execute(request: CreateCategoryRequest): Promise<CreateCategoryResponse> {
    const category = Category.create(request.name);
    category.validate();

    const saved = await this.categoryRepository.save(category);

    return {
      id: saved.id.value,
      name: saved.name,
      createdAt: saved.createdAt,
      updatedAt: saved.updatedAt,
    };
  }
}
