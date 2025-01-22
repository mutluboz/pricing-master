import { ValueObject } from '../shared/ValueObject';

interface WeightRangeProps {
  min: number;
  max: number;
}

export class WeightRange extends ValueObject<WeightRangeProps> {
  constructor(props: WeightRangeProps) {
    super(props);
    this.validate(props);
  }

  get min(): number { return this.value.min; }
  get max(): number { return this.value.max; }

  private validate(props: WeightRangeProps): void {
    if (props.min < 0) {
      throw new Error('Minimum weight must be non-negative');
    }
    if (props.max <= props.min) {
      throw new Error('Maximum weight must be greater than minimum weight');
    }
  }
}