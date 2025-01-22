import { ValueObject } from '../../shared/ValueObject';

export class Version extends ValueObject<number> {
  constructor(value: number) {
    super(value);
    this.validate(value);
  }

  private validate(value: number): void {
    if (!Number.isInteger(value) || value < 1) {
      throw new Error('Version must be a positive integer');
    }
  }

  next(): Version {
    return new Version(this.value + 1);
  }

  static initial(): Version {
    return new Version(1);
  }
}