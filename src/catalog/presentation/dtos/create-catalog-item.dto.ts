import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsNotEmpty, Min, Length } from "class-validator";

export class CreateCatalogItemDto {
  @ApiProperty({
    description: "The name of the catalog item",
    example: "Premium Coffee Beans",
    minLength: 1,
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  name: string;

  @ApiProperty({
    description: "The description of the catalog item",
    example: "Premium Arabica coffee beans from Colombia",
    required: false,
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: "The price of the catalog item",
    example: 29.99,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: "The currency code (3 letters)",
    example: "USD",
    pattern: "^[A-Z]{3}$",
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 3)
  currency: string;

  @ApiProperty({
    description: "The category of the catalog item",
    example: "Beverages",
    minLength: 1,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  category: string;
}
