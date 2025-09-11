import { Provider } from "@nestjs/common";
import { CreateProductUseCase } from "@/catalog/application/use-cases/create-product.use-case";
import { ProductRepositoryInterface } from "@/catalog/domain/interfaces/product.repository.interface";
import { DeleteProductUseCase } from "@/catalog/application/use-cases/delete-product.use-case";
import { GetAllProductsUseCase } from "@/catalog/application/use-cases/get-all-products.use-case";
import { GetProductUseCase } from "@/catalog/application/use-cases/get-product.use-case";
import { UpdateProductUseCase } from "@/catalog/application/use-cases/update-product.use-case";

export const CreateProductUseCaseProvider: Provider = {
  provide: CreateProductUseCase,
  useFactory: (productRepository: ProductRepositoryInterface) => {
    return new CreateProductUseCase(productRepository);
  },
  inject: ["ProductRepositoryInterface"],
};

export const DeleteProductUseCaseProvider: Provider = {
  provide: DeleteProductUseCase,
  useFactory: (productRepository: ProductRepositoryInterface) => {
    return new DeleteProductUseCase(productRepository);
  },
  inject: ["ProductRepositoryInterface"],
};

export const GetAllProductsUseCaseProvider: Provider = {
  provide: GetAllProductsUseCase,
  useFactory: (productRepository: ProductRepositoryInterface) => {
    return new GetAllProductsUseCase(productRepository);
  },
  inject: ["ProductRepositoryInterface"],
};

export const GetProductUseCaseProvider: Provider = {
  provide: GetProductUseCase,
  useFactory: (productRepository: ProductRepositoryInterface) => {
    return new GetProductUseCase(productRepository);
  },
  inject: ["ProductRepositoryInterface"],
};

export const UpdateProductUseCaseProvider: Provider = {
  provide: UpdateProductUseCase,
  useFactory: (productRepository: ProductRepositoryInterface) => {
    return new UpdateProductUseCase(productRepository);
  },
  inject: ["ProductRepositoryInterface"],
};
