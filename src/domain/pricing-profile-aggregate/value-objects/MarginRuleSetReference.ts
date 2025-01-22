import { ValueObject } from '../../shared/ValueObject';
import { MarginRuleSetId } from './MarginRuleSetId';
import { RuleSetPurpose } from '../enums/RuleSetPurpose';

interface MarginRuleSetReferenceProps {
  marginRuleSetId: MarginRuleSetId;
  priority: number;
  purpose: RuleSetPurpose;
}

export class MarginRuleSetReference extends ValueObject<MarginRuleSetReferenceProps> {
  constructor(props: MarginRuleSetReferenceProps) {
    super(props);
    this.validate(props);
  }

  get marginRuleSetId(): MarginRuleSetId { return this.value.marginRuleSetId; }
  get priority(): number { return this.value.priority; }
  get purpose(): RuleSetPurpose { return this.value.purpose; }

  private validate(props: MarginRuleSetReferenceProps): void {
    if (props.priority < 0) {
      throw new Error('Priority must be a non-negative number');
    }
  }
}