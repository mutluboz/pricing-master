import { Entity } from "../shared/Entity";
import { ZoneId } from "./value-objects/ZoneId";
import { TransitTime } from "../value-objects/TransitTime";

export class Zone extends Entity<ZoneId> {
  private readonly _destinationCountries: string[];
  private readonly _transitTime: TransitTime;

  constructor(
    id: ZoneId,
    destinationCountries: string[],
    transitTime: TransitTime
  ) {
    super(id);
    this._destinationCountries = destinationCountries;
    this._transitTime = transitTime;

    this.validateState();
  }

  get zoneId(): ZoneId {
    return this.id;
  }
  get destinationCountries(): string[] {
    return [...this._destinationCountries];
  }
  get transitTime(): TransitTime {
    return this._transitTime;
  }

  private validateState(): void {
    if (
      !this._destinationCountries ||
      this._destinationCountries.length === 0
    ) {
      throw new Error("At least one destination country is required");
    }
    if (
      new Set(this._destinationCountries).size !==
      this._destinationCountries.length
    ) {
      throw new Error("Duplicate destination countries are not allowed");
    }
    if (
      this._destinationCountries.some(
        (country) => !country || country.trim().length === 0
      )
    ) {
      throw new Error("Invalid destination country");
    }
  }
}
