import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from "@nestjs/swagger";

// DTOs
import { ProductInputDto } from "../dtos/product-input.dto";
import { ProductOutputDto } from "../dtos/product-output.dto";
import { ProductListOutputDto } from "../dtos/product-list-output.dto";

// Use Cases
import { CreateProductUseCase } from "@/catalog/application/use-cases/create-product.use-case";
import { GetProductUseCase } from "@/catalog/application/use-cases/get-product.use-case";
import { GetAllProductsUseCase } from "@/catalog/application/use-cases/get-all-products.use-case";
import { UpdateProductUseCase } from "@/catalog/application/use-cases/update-product.use-case";
import { DeleteProductUseCase } from "@/catalog/application/use-cases/delete-product.use-case";

@ApiTags("catalog")
@Controller("products")
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getProductUseCase: GetProductUseCase,
    private readonly getAllProductsUseCase: GetAllProductsUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: "Create a new product" })
  @ApiResponse({
    status: 201,
    description: "The product has been successfully created.",
    type: ProductInputDto,
  })
  @ApiBadRequestResponse({ description: "Invalid input data" })
  async create(@Body() createCatalogItemDto: ProductInputDto): Promise<ProductOutputDto> {
    try {
      const result = await this.createProductUseCase.execute({
        name: createCatalogItemDto.name,
        description: createCatalogItemDto.description,
        price: createCatalogItemDto.price,
        currency: createCatalogItemDto.currency,
        categoryId: createCatalogItemDto.categoryId,
      });

      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a product by ID" })
  @ApiParam({
    name: "id",
    description: "The UUID of the product",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @ApiResponse({
    status: 200,
    description: "The catalog item has been successfully retrieved.",
    type: ProductOutputDto,
  })
  @ApiNotFoundResponse({
    description: "Catalog item not found",
  })
  async findOne(@Param("id") id: string): Promise<ProductOutputDto> {
    try {
      const result = await this.getProductUseCase.execute({ id });

      if (!result) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a product" })
  @ApiParam({
    name: "id",
    description: "The UUID of the product",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @ApiResponse({
    status: 200,
    description: "The product has been successfully updated.",
    type: ProductOutputDto,
  })
  @ApiNotFoundResponse({ description: "Catalog item not found" })
  @ApiBadRequestResponse({ description: "Invalid input data" })
  async update(
    @Param("id") id: string,
    @Body() updateCatalogItemDto: ProductInputDto,
  ): Promise<ProductOutputDto> {
    try {
      const result = await this.updateProductUseCase.execute({
        id,
        ...updateCatalogItemDto,
      });

      if (!result) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Delete a product" })
  @ApiParam({
    name: "id",
    description: "The UUID of the product",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @ApiResponse({
    status: 204,
    description: "The product has been successfully deleted.",
  })
  @ApiNotFoundResponse({ description: "Product not found" })
  async remove(@Param("id") id: string): Promise<void> {
    try {
      const deleted = await this.deleteProductUseCase.execute({ id });

      if (!deleted) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  @ApiOperation({ summary: "Get all products" })
  @ApiResponse({
    status: 200,
    description: "List of products has been successfully retrieved.",
    type: ProductListOutputDto,
  })
  async findAll(): Promise<ProductListOutputDto> {
    try {
      return await this.getAllProductsUseCase.execute();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
