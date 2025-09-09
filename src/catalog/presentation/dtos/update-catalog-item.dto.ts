import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsOptional, Min, Length } from "class-validator";

export class UpdateCatalogItemDto {
  @ApiProperty({
    description: "The name of the catalog item",
    example: "Premium Coffee Beans",
    minLength: 1,
    maxLength: 255,
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  name?: string;

  @ApiProperty({
    description: "The description of the catalog item",
    example: "Premium Arabica coffee beans from Colombia",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: "The price of the catalog item",
    example: 29.99,
    minimum: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiProperty({
    description: "The currency code (3 letters)",
    example: "USD",
    pattern: "^[A-Z]{3}$",
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(3, 3)
  currency?: string;

  @ApiProperty({
    description: "The category of the catalog item",
    example: "Beverages",
    minLength: 1,
    maxLength: 100,
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  category?: string;
}
