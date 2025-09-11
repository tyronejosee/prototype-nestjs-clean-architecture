import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsNotEmpty, Min, Length, IsUUID, IsOptional } from "class-validator";

export class ProductInputDto {
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
  @IsOptional()
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
    description: "The category of the product",
    example: "b7c0c9a6-cf92-4a81-a7e0-c8b4f87b9b6c",
  })
  @IsUUID()
  categoryId: string;
}
