import { Entity } from '../shared/Entity';
import { v4 as uuidv4 } from 'uuid';
import { Percentage } from './value-objects/Percentage';
import { WeightRange } from '../value-objects/WeightRange';
import { ZoneGroup } from './ZoneGroup';

export class MarginRule extends Entity<string> {
  private readonly _zoneGroup: ZoneGroup;
  private readonly _margin: Percentage;
  private readonly _weightRange: WeightRange;
  private readonly _priority: number;

  constructor(
    zoneGroup: ZoneGroup,
    margin: Percentage,
    weightRange: WeightRange,
    priority: number,
    id: string = uuidv4()
  ) {
    super(id);
    this._zoneGroup = zoneGroup;
    this._margin = margin;
    this._weightRange = weightRange;
    this._priority = priority;

    this.validateState();
  }

  get zoneGroup(): ZoneGroup { return this._zoneGroup; }
  get margin(): Percentage { return this._margin; }
  get weightRange(): WeightRange { return this._weightRange; }
  get priority(): number { return this._priority; }

  private validateState(): void {
    if (this._priority < 0) {
      throw new Error('Priority must be a non-negative number');
    }
  }

  appliesTo(country: string, weight: number): boolean {
    return this._zoneGroup.includesCountry(country) && 
           weight >= this._weightRange.min && 
           weight <= this._weightRange.max;
  }
}