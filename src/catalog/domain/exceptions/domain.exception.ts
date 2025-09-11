export class DomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class InvalidPriceException extends DomainException {}
export class ProductNotFoundException extends DomainException {}
export class CategoryNotFoundException extends DomainException {}
