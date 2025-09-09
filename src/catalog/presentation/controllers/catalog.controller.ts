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
import { CreateCatalogItemDto } from "../dtos/create-catalog-item.dto";
import { UpdateCatalogItemDto } from "../dtos/update-catalog-item.dto";
import { CatalogItemResponseDto } from "../dtos/catalog-item-response.dto";
import { CatalogItemsListResponseDto } from "../dtos/catalog-items-list-response.dto";

// Use Cases
import { CreateCatalogItemUseCase } from "../../application/use-cases/create-catalog-item.use-case";
import { GetCatalogItemUseCase } from "../../application/use-cases/get-catalog-item.use-case";
import { GetAllCatalogItemsUseCase } from "../../application/use-cases/get-all-catalog-items.use-case";
import { UpdateCatalogItemUseCase } from "../../application/use-cases/update-catalog-item.use-case";
import { DeleteCatalogItemUseCase } from "../../application/use-cases/delete-catalog-item.use-case";

@ApiTags("catalog")
@Controller("catalog")
export class CatalogController {
  constructor(
    private readonly createCatalogItemUseCase: CreateCatalogItemUseCase,
    private readonly getCatalogItemUseCase: GetCatalogItemUseCase,
    private readonly getAllCatalogItemsUseCase: GetAllCatalogItemsUseCase,
    private readonly updateCatalogItemUseCase: UpdateCatalogItemUseCase,
    private readonly deleteCatalogItemUseCase: DeleteCatalogItemUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: "Create a new catalog item" })
  @ApiResponse({
    status: 201,
    description: "The catalog item has been successfully created.",
    type: CatalogItemResponseDto,
  })
  @ApiBadRequestResponse({
    description: "Invalid input data",
  })
  async create(
    @Body() createCatalogItemDto: CreateCatalogItemDto,
  ): Promise<CatalogItemResponseDto> {
    try {
      const result = await this.createCatalogItemUseCase.execute({
        name: createCatalogItemDto.name,
        description: createCatalogItemDto.description,
        price: createCatalogItemDto.price,
        currency: createCatalogItemDto.currency,
        category: createCatalogItemDto.category,
      });

      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a catalog item by ID" })
  @ApiParam({
    name: "id",
    description: "The UUID of the catalog item",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @ApiResponse({
    status: 200,
    description: "The catalog item has been successfully retrieved.",
    type: CatalogItemResponseDto,
  })
  @ApiNotFoundResponse({
    description: "Catalog item not found",
  })
  async findOne(@Param("id") id: string): Promise<CatalogItemResponseDto> {
    try {
      const result = await this.getCatalogItemUseCase.execute({ id });

      if (!result) {
        throw new NotFoundException(`Catalog item with ID ${id} not found`);
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
  @ApiOperation({ summary: "Update a catalog item" })
  @ApiParam({
    name: "id",
    description: "The UUID of the catalog item",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @ApiResponse({
    status: 200,
    description: "The catalog item has been successfully updated.",
    type: CatalogItemResponseDto,
  })
  @ApiNotFoundResponse({
    description: "Catalog item not found",
  })
  @ApiBadRequestResponse({
    description: "Invalid input data",
  })
  async update(
    @Param("id") id: string,
    @Body() updateCatalogItemDto: UpdateCatalogItemDto,
  ): Promise<CatalogItemResponseDto> {
    try {
      const result = await this.updateCatalogItemUseCase.execute({
        id,
        ...updateCatalogItemDto,
      });

      if (!result) {
        throw new NotFoundException(`Catalog item with ID ${id} not found`);
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
  @ApiOperation({ summary: "Delete a catalog item" })
  @ApiParam({
    name: "id",
    description: "The UUID of the catalog item",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @ApiResponse({
    status: 204,
    description: "The catalog item has been successfully deleted.",
  })
  @ApiNotFoundResponse({
    description: "Catalog item not found",
  })
  async remove(@Param("id") id: string): Promise<void> {
    try {
      const deleted = await this.deleteCatalogItemUseCase.execute({ id });

      if (!deleted) {
        throw new NotFoundException(`Catalog item with ID ${id} not found`);
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  @ApiOperation({ summary: "Get all catalog items" })
  @ApiResponse({
    status: 200,
    description: "List of catalog items has been successfully retrieved.",
    type: CatalogItemsListResponseDto,
  })
  async findAll(): Promise<CatalogItemsListResponseDto> {
    try {
      const result = await this.getAllCatalogItemsUseCase.execute();
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
