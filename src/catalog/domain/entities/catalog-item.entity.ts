import { CatalogId } from "../value-objects/catalog-id.value-object";
import { Price } from "../value-objects/price.value-object";
import { Category } from "../value-objects/category.value-object";

export class CatalogItem {
  private constructor(
    private readonly _id: CatalogId,
    private _name: string,
    private _description: string,
    private _price: Price,
    private _category: Category,
    private _isActive: boolean = true,
    private readonly _createdAt: Date = new Date(),
    private _updatedAt: Date = new Date(),
  ) {}

  static create(
    name: string,
    description: string,
    price: number,
    currency: string,
    categoryName: string,
    id?: string,
  ): CatalogItem {
    return new CatalogItem(
      new CatalogId(id),
      name,
      description,
      new Price(price, currency),
      new Category(categoryName),
    );
  }

  static fromPersistence(
    id: string,
    name: string,
    description: string,
    price: number,
    currency: string,
    categoryName: string,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date,
  ): CatalogItem {
    return new CatalogItem(
      new CatalogId(id),
      name,
      description,
      new Price(price, currency),
      new Category(categoryName),
      isActive,
      createdAt,
      updatedAt,
    );
  }

  // Getters
  get id(): CatalogId {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get price(): Price {
    return this._price;
  }

  get category(): Category {
    return this._category;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  // Business methods
  updateInfo(name: string, description: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error("Name cannot be empty");
    }

    this._name = name.trim();
    this._description = description?.trim() || "";
    this._updatedAt = new Date();
  }

  updatePrice(price: number, currency: string): void {
    this._price = new Price(price, currency);
    this._updatedAt = new Date();
  }

  updateCategory(categoryName: string): void {
    this._category = new Category(categoryName);
    this._updatedAt = new Date();
  }

  activate(): void {
    this._isActive = true;
    this._updatedAt = new Date();
  }

  deactivate(): void {
    this._isActive = false;
    this._updatedAt = new Date();
  }

  // Domain validation
  validate(): void {
    if (!this._name || this._name.trim().length === 0) {
      throw new Error("Catalog item name is required");
    }

    if (this._name.length > 255) {
      throw new Error("Catalog item name cannot exceed 255 characters");
    }

    this._price.validate();
    this._category.validate();
  }
}
