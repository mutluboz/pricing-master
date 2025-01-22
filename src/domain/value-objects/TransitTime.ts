import { ValueObject } from '../shared/ValueObject';

interface TransitTimeProps {
  min: number;
  max: number;
}

export class TransitTime extends ValueObject<TransitTimeProps> {
  constructor(props: TransitTimeProps) {
    super(props);
    this.validate(props);
  }

  get min(): number { return this.value.min; }
  get max(): number { return this.value.max; }

  private validate(props: TransitTimeProps): void {
    if (!Number.isInteger(props.min) || props.min < 0) {
      throw new Error('Minimum transit time must be a non-negative integer');
    }
    if (!Number.isInteger(props.max) || props.max < 0) {
      throw new Error('Maximum transit time must be a non-negative integer');
    }
    if (props.max < props.min) {
      throw new Error('Maximum transit time must be greater than or equal to minimum transit time');
    }
  }
}