import { ValueObject } from '../shared/ValueObject';

export enum CurrencyCode {
  EUR = 'eur',
  USD = 'usd'
}

export class Currency extends ValueObject<CurrencyCode> {
  constructor(value: CurrencyCode) {
    super(value);
  }

  static fromString(value: string): Currency {
    const normalizedValue = value.toLowerCase();
    const currencyCode = Object.values(CurrencyCode).find(
      code => code === normalizedValue
    );

    if (!currencyCode) {
      throw new Error(`Unsupported currency: ${value}`);
    }

    return new Currency(currencyCode);
  }

  toString(): string {
    return this.value;
  }
}