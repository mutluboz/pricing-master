import { Entity } from "../shared/Entity";
import { Zone } from "./Zone";
import { Rate } from "./Rate";
import { PriceListId } from "./value-objects/PriceListId";
import { Carrier } from "../value-objects/Carrier";
import { Service } from "../value-objects/Service";
import { PriceListStatus } from "./enums/PriceListStatus";
import { Currency } from "../value-objects/Currency";
import { Version } from "./value-objects/Version";
import { Percentage } from "../pricing-profile-aggregate/value-objects/Percentage";
import { Money } from "../value-objects/Money";

export class PriceList extends Entity<PriceListId> {
  private readonly _carrier: Carrier;
  private readonly _service: Service;
  private readonly _currency: Currency;
  private readonly _version: Version;
  private readonly _effectiveDate: Date;
  private readonly _defaultMargin: Percentage;
  private readonly _createdBy: string;
  private readonly _createdDate: Date;
  private readonly _originCountry: string;
  private _status: PriceListStatus;
  private readonly _zones: Zone[];
  private readonly _rates: Rate[];

  constructor(
    id: PriceListId,
    carrier: Carrier,
    service: Service,
    currency: Currency,
    version: Version,
    effectiveDate: Date,
    defaultMargin: Percentage,
    createdBy: string,
    originCountry: string,
    zones: Zone[],
    rates: Rate[],
    status: PriceListStatus = PriceListStatus.ACTIVE
  ) {
    super(id);
    this._carrier = carrier;
    this._service = service;
    this._currency = currency;
    this._defaultMargin = defaultMargin;
    this._version = version;
    this._effectiveDate = effectiveDate;
    this._createdBy = createdBy;
    this._createdDate = new Date();
    this._originCountry = originCountry;
    this._zones = zones;
    this._rates = rates;
    this._status = status;

    this.validateState();
  }

  // Properties
  get carrier(): Carrier {
    return this._carrier;
  }
  get service(): Service {
    return this._service;
  }
  get currency(): Currency {
    return this._currency;
  }
  get defaultMargin(): Percentage {
    return this._defaultMargin;
  }
  get version(): Version {
    return this._version;
  }
  get effectiveDate(): Date {
    return new Date(this._effectiveDate);
  }
  get createdBy(): string {
    return this._createdBy;
  }
  get createdDate(): Date {
    return new Date(this._createdDate);
  }
  get status(): PriceListStatus {
    return this._status;
  }
  get zones(): Zone[] {
    return [...this._zones];
  }
  get rates(): Rate[] {
    return [...this._rates];
  }
  get originCountry(): string {
    return this._originCountry;
  }

  // Business Methods
  calculateRateWithDefaultMargin(rate: Rate): Money {
    const amount = this._defaultMargin.Value * rate.rate.amount;
    return new Money({ amount, currency: this._currency });
  }

  // Business Methods
  deactivate(): void {
    if (this._status === PriceListStatus.INACTIVE) {
      throw new Error("Price list is already inactive");
    }
    this._status = PriceListStatus.INACTIVE;
  }

  // Domain Rules
  private validateState(): void {
    if (
      typeof this._createdBy !== "string" ||
      this._createdBy.trim().length === 0
    ) {
      throw new Error("Created by is required");
    }
    if (this._defaultMargin.Value < 0) {
      throw new Error("Default margin cannot be negative");
    }
    if (!this._originCountry || this._originCountry.trim().length === 0) {
      throw new Error("Origin country is required");
    }

    if (this._zones.length === 0) {
      throw new Error("Price list must have at least one zone");
    }
    if (this._rates.length === 0) {
      throw new Error("Price list must have at least one rate");
    }

    this.validateZoneIds();
    this.validateRateZones();
    this.validateWeightRanges();
    this.validateRateCurrencies();
  }

  private validateRateCurrencies(): void {
    const invalidRates = this._rates.filter(
      (r) => r.rate.currency.toString() !== this._currency.toString()
    );
    if (invalidRates.length > 0) {
      throw new Error("All rates must use the same currency as the price list");
    }
  }

  private validateZoneIds(): void {
    // Check for duplicate zone IDs
    const zoneIds = this._zones.map((z) => z.zoneId.toString());
    // if (new Set(zoneIds).size !== zoneIds.length) {
    //   throw new Error("Duplicate zone IDs are not allowed");
    // }

    // Check for duplicate country assignments
    const countryAssignments = new Set<string>();
    for (const zone of this._zones) {
      for (const country of zone.destinationCountries) {
        if (countryAssignments.has(country)) {
          throw new Error(
            `Country ${country} cannot be assigned to multiple zones`
          );
        }
        countryAssignments.add(country);
      }
    }
  }

  private validateRateZones(): void {
    const validZoneIds = new Set(this._zones.map((z) => z.zoneId.toString()));
    const invalidRates = this._rates.filter(
      (r) => !validZoneIds.has(r.zoneId.toString())
    );
    if (invalidRates.length > 0) {
      throw new Error(
        `Invalid zone IDs in rates: ${invalidRates
          .map((r) => r.zoneId.toString())
          .join(", ")}`
      );
    }
  }

  private validateWeightRanges(): void {
    const zoneIds = new Set(this._zones.map((z) => z.zoneId.toString()));

    for (const zoneId of zoneIds) {
      const zoneRates = this._rates
        .filter((r) => r.zoneId.toString() === zoneId)
        .sort((a, b) => a.weightRange.min - b.weightRange.min);

      // for (let i = 1; i < zoneRates.length; i++) {
      //   if (zoneRates[i].weightRange.min < zoneRates[i - 1].weightRange.max) {
      //     throw new Error(`Overlapping weight ranges in zone ${zoneId}`);
      //   }
      // }
    }
  }
}
