export class Category {
  private readonly _name: string;

  constructor(name: string) {
    this._name = name.trim();
    this.validate();
  }

  get name(): string {
    return this._name;
  }

  validate(): void {
    if (!this._name || this._name.length === 0) {
      throw new Error("Category name cannot be empty");
    }

    if (this._name.length > 100) {
      throw new Error("Category name cannot exceed 100 characters");
    }

    // Check for valid characters (letters, numbers, spaces, hyphens)
    const validPattern = /^[a-zA-Z0-9\s\-]+$/;
    if (!validPattern.test(this._name)) {
      throw new Error("Category name contains invalid characters");
    }
  }

  equals(other: Category): boolean {
    return this._name.toLowerCase() === other._name.toLowerCase();
  }

  toString(): string {
    return this._name;
  }
}
