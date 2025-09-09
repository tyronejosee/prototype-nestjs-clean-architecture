import { ApiProperty } from "@nestjs/swagger";

export class CatalogItemResponseDto {
  @ApiProperty({
    description: "The unique identifier of the catalog item",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  id: string;

  @ApiProperty({
    description: "The name of the catalog item",
    example: "Premium Coffee Beans",
  })
  name: string;

  @ApiProperty({
    description: "The description of the catalog item",
    example: "Premium Arabica coffee beans from Colombia",
  })
  description: string;

  @ApiProperty({
    description: "The price of the catalog item",
    example: 29.99,
  })
  price: number;

  @ApiProperty({
    description: "The currency code",
    example: "USD",
  })
  currency: string;

  @ApiProperty({
    description: "The category of the catalog item",
    example: "Beverages",
  })
  category: string;

  @ApiProperty({
    description: "Whether the catalog item is active",
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: "The creation date of the catalog item",
    example: "2023-01-01T00:00:00Z",
  })
  createdAt: Date;

  @ApiProperty({
    description: "The last update date of the catalog item",
    example: "2023-01-01T00:00:00Z",
  })
  updatedAt: Date;
}
