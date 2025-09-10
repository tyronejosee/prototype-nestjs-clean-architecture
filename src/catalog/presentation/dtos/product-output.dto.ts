import { ApiProperty } from "@nestjs/swagger";

export class ProductOutputDto {
  @ApiProperty({
    description: "The unique identifier of the product",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  id: string;

  @ApiProperty({
    description: "The name of the product",
    example: "Premium Coffee Beans",
  })
  name: string;

  @ApiProperty({
    description: "The description of the product",
    example: "Premium Arabica coffee beans from Colombia",
  })
  description: string;

  @ApiProperty({
    description: "The price of the product",
    example: 29.99,
  })
  price: number;

  @ApiProperty({
    description: "The currency code",
    example: "USD",
  })
  currency: string;

  @ApiProperty({
    description: "The category of the product",
    example: "b7c0c9a6-cf92-4a81-a7e0-c8b4f87b9b6c",
  })
  categoryId: string;

  @ApiProperty({
    description: "Whether the product is active or not",
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: "The creation date of the product",
    example: "2023-01-01T00:00:00Z",
  })
  createdAt: Date;

  @ApiProperty({
    description: "The last update date of the product",
    example: "2023-01-01T00:00:00Z",
  })
  updatedAt: Date;
}
