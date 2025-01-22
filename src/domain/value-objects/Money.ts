import { ValueObject } from '../shared/ValueObject';
import { Currency } from './Currency';

interface MoneyProps {
  amount: number;
  currency: Currency;
}

export class Money extends ValueObject<MoneyProps> {
  constructor(
    props: MoneyProps
  ) {
    super(props);
    this.validate(props.amount);
  }

  get amount(): number { return this.value.amount; }
  get currency(): Currency { return this.value.currency; }

  private validate(value: number): void {
    if (value <= 0) {
      throw new Error('Rate must be a positive number');
    }
  }
}