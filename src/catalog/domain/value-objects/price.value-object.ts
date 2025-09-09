export class Price {
  private readonly _amount: number;
  private readonly _currency: string;

  constructor(amount: number, currency: string) {
    this._amount = amount;
    this._currency = currency.toUpperCase();
    this.validate();
  }

  get amount(): number {
    return this._amount;
  }

  get currency(): string {
    return this._currency;
  }

  validate(): void {
    if (this._amount < 0) {
      throw new Error("Price amount cannot be negative");
    }

    if (!this._currency || this._currency.length !== 3) {
      throw new Error("Currency must be a valid 3-letter code");
    }

    const validCurrencies = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD"];
    if (!validCurrencies.includes(this._currency)) {
      throw new Error(`Unsupported currency: ${this._currency}`);
    }
  }

  equals(other: Price): boolean {
    return this._amount === other._amount && this._currency === other._currency;
  }

  toString(): string {
    return `${this._amount} ${this._currency}`;
  }
}
