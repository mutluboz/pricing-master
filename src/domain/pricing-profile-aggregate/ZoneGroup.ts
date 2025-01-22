import { Entity } from '../shared/Entity';
import { v4 as uuidv4 } from 'uuid';

export class ZoneGroup extends Entity<string> {
  private readonly _name: string;
  private readonly _countries: string[];
  private readonly _description: string;

  constructor(
    name: string,
    countries: string[],
    description: string,
    id: string = uuidv4()
  ) {
    super(id);
    this._name = name;
    this._countries = countries;
    this._description = description;

    this.validateState();
  }

  get name(): string { return this._name; }
  get countries(): string[] { return [...this._countries]; }
  get description(): string { return this._description; }

  includesCountry(country: string): boolean {
    return this._countries.includes(country.toUpperCase());
  }

  private validateState(): void {
    if (!this._name || this._name.trim().length === 0) {
      throw new Error('Name is required');
    }
    if (this._countries.length === 0) {
      throw new Error('At least one country is required');
    }
    this.validateCountryCodes();
  }

  private validateCountryCodes(): void {
    const invalidCodes = this._countries.filter(code => !this.isValidCountryCode(code));
    if (invalidCodes.length > 0) {
      throw new Error(`Invalid country codes: ${invalidCodes.join(', ')}`);
    }
  }

  private isValidCountryCode(code: string): boolean {
    return /^[A-Z]{2}$/.test(code);
  }
}