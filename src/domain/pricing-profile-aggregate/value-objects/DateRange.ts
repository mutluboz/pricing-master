import { ValueObject } from '../../shared/ValueObject';

interface DateRangeProps {
  startDate: Date;
  endDate: Date;
}

export class DateRange extends ValueObject<DateRangeProps> {
  constructor(props: DateRangeProps) {
    super(props);
    this.validate(props);
  }

  get startDate(): Date { return new Date(this.value.startDate); }
  get endDate(): Date { return new Date(this.value.endDate); }

  private validate(props: DateRangeProps): void {
    if (props.endDate < props.startDate) {
      throw new Error('End date must be after start date');
    }
  }

  isActive(date: Date = new Date()): boolean {
    return date >= this.startDate && date <= this.endDate;
  }
}