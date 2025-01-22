import { Entity } from '../shared/Entity';
import { ZoneId } from './value-objects/ZoneId';
import { WeightRange } from '../value-objects/WeightRange';
import { Money } from '../value-objects/Money';

export class Rate extends Entity<ZoneId> {
  private readonly _weightRange: WeightRange;
  private readonly _rate: Money;

  constructor(
    zoneId: ZoneId,
    weightRange: WeightRange,
    rate: Money
  ) {
    super(zoneId);
    this._weightRange = weightRange;
    this._rate = rate;
  }

  get zoneId(): ZoneId { return this.id; }
  get weightRange(): WeightRange { return this._weightRange; }
  get rate(): Money { return this._rate; }
}