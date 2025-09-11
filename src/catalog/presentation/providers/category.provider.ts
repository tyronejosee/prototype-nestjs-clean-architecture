import { Provider } from "@nestjs/common";
import { CreateCategoryUseCase } from "@/catalog/application/use-cases/create-category.use-case";
import { CategoryRepositoryInterface } from "@/catalog/domain/interfaces/category.repository.interface";
import { GetAllCategoriesUseCase } from "@/catalog/application/use-cases/get-all-categories.use-case";

export const CreateCategoryUseCaseProvider: Provider = {
  provide: CreateCategoryUseCase,
  useFactory: (categoryRepository: CategoryRepositoryInterface) => {
    return new CreateCategoryUseCase(categoryRepository);
  },
  inject: ["CategoryRepositoryInterface"],
};

export const GetAllCategoriesUseCaseProvider: Provider = {
  provide: GetAllCategoriesUseCase,
  useFactory: (categoryRepository: CategoryRepositoryInterface) => {
    return new GetAllCategoriesUseCase(categoryRepository);
  },
  inject: ["CategoryRepositoryInterface"],
};
