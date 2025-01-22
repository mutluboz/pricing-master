import { v4 as uuidv4 } from 'uuid';
import { ValueObject } from '../../shared/ValueObject';

export class PriceListId extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.validate(value);
  }

  private validate(value: string): void {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(value)) {
      throw new Error('Invalid price list ID format');
    }
  }

  static generate(): PriceListId {
    return new PriceListId(uuidv4());
  }
}