import { ValueObject } from '../shared/ValueObject';

export enum ServiceType {
  EXPRESS = 'express',
  ECO_EXPRESS = 'ecoexpress',
  UNREGISTERED_PACKAGE = 'unregisteredpackage',
  REGISTERED_SMALL_PACKAGE = 'registeredsmallpackage',
  REGISTERED_PACKAGE_SURFACE = 'registeredpackagesurface',
  REGISTERED_PACKAGE_AIR = 'registeredpackageair',
  AMAZON_SEAWAY = 'amazonseaway',
  EXPEDITED = 'expedited',
  UPS_STANDART = 'upsstandart',
  ABD_ECO_ETGB = 'abdecoetgb',
  INT_ECO = 'inteco',
  USPM = 'uspm',
  EXPS = 'exps'
}

export class Service extends ValueObject<ServiceType> {
  constructor(value: ServiceType) {
    super(value);
  }

  static fromString(value: string): Service {
    const normalizedValue = value.toLowerCase();
    const serviceType = Object.values(ServiceType).find(
      type => type === normalizedValue
    );

    if (!serviceType) {
      throw new Error(`Invalid service type: ${value}`);
    }

    return new Service(serviceType);
  }

  toString(): string {
    return this.value;
  }
}