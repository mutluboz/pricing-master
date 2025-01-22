import { ValueObject } from '../../shared/ValueObject';

export class ZoneId extends ValueObject<number> {
  constructor(value: number) {
    super(value);
    this.validate(value);
  }

  private validate(value: number): void {
    if (!Number.isInteger(value) || value <= 0) {
      throw new Error('Zone ID must be a positive integer');
    }
  }
}