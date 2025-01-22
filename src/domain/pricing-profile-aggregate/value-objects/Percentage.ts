import { ValueObject } from '../../shared/ValueObject';

export class Percentage extends ValueObject<number> {
  constructor(value: number) {
    super(value);
    this.validate(value);
  }

  private validate(value: number): void {
    if (value < 0) {
      throw new Error('Percentage cannot be negative');
    }
  }

  applyTo(amount: number): number {
    return amount * (1 + this.value / 100);
  }
}