import { PriceList } from "../price-list-aggregate/PriceList";
import { PriceListId } from "../price-list-aggregate/value-objects/PriceListId";
import { Carrier, CarrierName } from "../value-objects/Carrier";
import { Service, ServiceType } from "../value-objects/Service";
import { Currency, CurrencyCode } from "../value-objects/Currency";
import { Version } from "../price-list-aggregate/value-objects/Version";
import { Percentage } from "../pricing-profile-aggregate/value-objects/Percentage";
import { Zone } from "../price-list-aggregate/Zone";
import { Rate } from "../price-list-aggregate/Rate";
import { PriceListStatus } from "../price-list-aggregate/enums/PriceListStatus";
import { Money } from "../value-objects/Money";
import { WeightRange } from "../value-objects/WeightRange";
import { ZoneId } from "../price-list-aggregate/value-objects/ZoneId";
import { TransitTime } from "../value-objects/TransitTime";
import { generateGuid } from "@/utils/formatters";

// Mock Value Objects
export const mockPriceListId1 = new PriceListId(generateGuid());
export const mockPriceListId2 = new PriceListId(generateGuid());
export const mockPriceListId3 = new PriceListId(generateGuid());
export const mockPriceListId4 = new PriceListId(generateGuid());

export const mockCarrier = new Carrier(CarrierName.DHL);
export const mockService = new Service(ServiceType.EXPRESS);
export const mockCurrency = new Currency(CurrencyCode.USD);
export const mockVersion = new Version(1);
export const mockDefaultMargin = new Percentage(10);
export const mockTransitTime = new TransitTime({ min: 2, max: 4 }); // 2-4 days transit time

// Create zones for each price list with non-overlapping countries
const createZones = (baseId: number) => [
  new Zone(
    new ZoneId(baseId),
    ["UK", "IE"], // UK and Ireland
    mockTransitTime
  ),
  new Zone(
    new ZoneId(baseId + 1),
    ["DE", "AT", "CH"], // DACH region
    mockTransitTime
  ),
];

// Create unique zones for each price list with different base IDs
export const mockZones1 = createZones(1); // Zone IDs: 1, 2
export const mockZones2 = createZones(3); // Zone IDs: 3, 4
export const mockZones3 = createZones(5); // Zone IDs: 5, 6
export const mockZones4 = [
  new Zone(
    new ZoneId(7),
    ["FR", "BE", "NL", "LU"], // Benelux + France
    mockTransitTime
  ),
  new Zone(
    new ZoneId(8),
    ["ES", "PT"], // Iberia
    mockTransitTime
  ),
];

// Create weight ranges with 0.5kg steps until 5kg, then 1kg steps until 20kg
const createWeightRanges = () => {
  const ranges = [];

  // 0-5kg with 0.5kg steps
  for (let i = 0; i < 5; i += 0.5) {
    ranges.push(new WeightRange({ min: i, max: i + 0.5 }));
  }

  // 5-20kg with 1kg steps
  for (let i = 5; i < 20; i += 1) {
    ranges.push(new WeightRange({ min: i, max: i + 1 }));
  }

  return ranges;
};

// Create rates for a zone with base price and increment
const createZoneRates = (
  zoneId: number,
  basePrice: number,
  increment: number,
  currency: Currency = mockCurrency
) => {
  const rates: Rate[] = [];
  const weightRanges = createWeightRanges();

  weightRanges.forEach((weightRange, index) => {
    const price = basePrice + index * increment;
    rates.push(
      new Rate(
        new ZoneId(zoneId),
        weightRange,
        new Money({ amount: price, currency })
      )
    );
  });

  return rates;
};

// Create rates for price list 1
export const mockRates1 = [
  ...createZoneRates(1, 10, 2), // Western Europe rates
  ...createZoneRates(2, 12, 2.5), // Southern Europe rates
];

// Create rates for price list 2 (ECO service - lower rates)
export const mockRates2 = [
  ...createZoneRates(3, 8, 1.5), // Western Europe rates
  ...createZoneRates(4, 10, 2), // Southern Europe rates
];

// Create rates for price list 3 (FedEx - higher rates)
export const mockRates3 = [
  ...createZoneRates(5, 11, 2.2), // Western Europe rates
  ...createZoneRates(6, 13, 2.7), // Southern Europe rates
];

// Create rates for price list 4 (EUR currency)
const eurCurrency = new Currency(CurrencyCode.EUR);
export const mockRates4 = [
  ...createZoneRates(7, 9, 1.8, eurCurrency), // Western Europe rates
  ...createZoneRates(8, 11, 2.3, eurCurrency), // Southern Europe rates
];

// Mock PriceLists with different configurations
export const mockPriceList1 = new PriceList(
  mockPriceListId1,
  mockCarrier,
  mockService,
  mockCurrency,
  mockVersion,
  new Date("2024-01-01"),
  mockDefaultMargin,
  "test-user",
  "US", // origin country
  mockZones1,
  mockRates1,
  PriceListStatus.ACTIVE
);

export const mockPriceList2 = new PriceList(
  mockPriceListId2,
  mockCarrier,
  new Service(ServiceType.ECO_EXPRESS),
  mockCurrency,
  mockVersion,
  new Date("2024-02-01"),
  new Percentage(15),
  "test-user",
  "US", // origin country
  mockZones2,
  mockRates2,
  PriceListStatus.ACTIVE
);

export const mockPriceList3 = new PriceList(
  mockPriceListId3,
  new Carrier(CarrierName.FEDEX),
  mockService,
  mockCurrency,
  mockVersion,
  new Date("2024-03-01"),
  new Percentage(12),
  "test-user",
  "US", // origin country
  mockZones3,
  mockRates3,
  PriceListStatus.ACTIVE
);

export const mockPriceList4 = new PriceList(
  mockPriceListId4,
  mockCarrier,
  mockService,
  eurCurrency,
  mockVersion,
  new Date("2024-01-15"),
  mockDefaultMargin,
  "test-user",
  "DE", // different origin country
  mockZones4,
  mockRates4,
  PriceListStatus.INACTIVE
);
