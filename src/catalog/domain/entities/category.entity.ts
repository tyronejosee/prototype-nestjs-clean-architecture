import { UUID } from "../value-objects/uuid.value-object";

export class Category {
  private constructor(
    private readonly _id: UUID,
    private _name: string,
    private readonly _createdAt: Date = new Date(),
    private _updatedAt: Date = new Date(),
  ) {}

  static create(name: string, id?: string): Category {
    return new Category(new UUID(id), name.trim());
  }

  static fromPersistence(id: string, name: string, createdAt: Date, updatedAt: Date): Category {
    return new Category(new UUID(id), name, createdAt, updatedAt);
  }

  get id(): UUID {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  updateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error("Category name cannot be empty");
    }
    this._name = name.trim();
    this._updatedAt = new Date();
  }

  validate(): void {
    if (!this._name || this._name.length === 0) {
      throw new Error("Category name is required");
    }
    if (this._name.length > 100) {
      throw new Error("Category name cannot exceed 100 characters");
    }
  }
}
