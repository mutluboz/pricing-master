import { ValueObject } from '../shared/ValueObject';

export enum CarrierName {
  UPS = 'ups',
  TNT = 'tnt',
  QUICK_SHIPPER = 'quickshipper',
  YOU_PARCEL = 'youparcel',
  FEDEX = 'fedex',
  PTT = 'ptt',
  TURPEX = 'turpex',
  DHL = 'dhl',
  PTS = 'pts',
  SHIP_STATION_FOR_USPS = 'shipstationforusps',
  EXELOT = 'exelot',
  ARAMEX = 'aramex',
  ASENDIA = 'asendia',
  WIDECT = 'widect'
}

export class Carrier extends ValueObject<CarrierName> {
  constructor(value: CarrierName) {
    super(value);
  }

  static fromString(value: string): Carrier {
    const normalizedValue = value.toLowerCase();
    const carrierName = Object.values(CarrierName).find(
      name => name === normalizedValue
    );

    if (!carrierName) {
      throw new Error(`Invalid carrier name: ${value}`);
    }

    return new Carrier(carrierName);
  }

  toString(): string {
    return this.value;
  }
}