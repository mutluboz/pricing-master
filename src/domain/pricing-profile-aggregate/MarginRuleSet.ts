import { Entity } from '../shared/Entity';
import { MarginRule } from './MarginRule';
import { MarginRuleSetId } from './value-objects/MarginRuleSetId';
import { DateRange } from './value-objects/DateRange';
import { RuleSetStatus } from './enums/RuleSetStatus';

export class MarginRuleSet extends Entity<MarginRuleSetId> {
  private readonly _name: string;
  private readonly _description: string;
  private readonly _marginRules: MarginRule[];
  private readonly _validityPeriod?: DateRange;
  private _status: RuleSetStatus;
  private readonly _createdBy: string;
  private readonly _createdDate: Date;

  constructor(
    id: MarginRuleSetId,
    name: string,
    description: string,
    marginRules: MarginRule[],
    createdBy: string,
    validityPeriod?: DateRange,
    status: RuleSetStatus = RuleSetStatus.DRAFT
  ) {
    super(id);
    this._name = name;
    this._description = description;
    this._marginRules = marginRules;
    this._validityPeriod = validityPeriod;
    this._status = status;
    this._createdBy = createdBy;
    this._createdDate = new Date();

    this.validateState();
  }

  // Properties
  get name(): string { return this._name; }
  get description(): string { return this._description; }
  get marginRules(): MarginRule[] { return [...this._marginRules]; }
  get validityPeriod(): DateRange | undefined { return this._validityPeriod; }
  get status(): RuleSetStatus { return this._status; }
  get createdBy(): string { return this._createdBy; }
  get createdDate(): Date { return new Date(this._createdDate); }

  // Business Methods
  activate(): void {
    if (this._status === RuleSetStatus.ACTIVE) {
      throw new Error('Rule set is already active');
    }
    this._status = RuleSetStatus.ACTIVE;
  }

  deactivate(): void {
    if (this._status === RuleSetStatus.INACTIVE) {
      throw new Error('Rule set is already inactive');
    }
    this._status = RuleSetStatus.INACTIVE;
  }

  isActive(date: Date = new Date()): boolean {
    if (this._status !== RuleSetStatus.ACTIVE) {
      return false;
    }
    return !this._validityPeriod || this._validityPeriod.isActive(date);
  }

  findApplicableRule(country: string, weight: number): MarginRule | undefined {
    return this._marginRules
      .filter(rule => rule.appliesTo(country, weight))
      .sort((a, b) => b.priority - a.priority)[0];
  }

  // Domain Rules
  private validateState(): void {
    if (!this._name || this._name.trim().length === 0) {
      throw new Error('Name is required');
    }
    if (!this._createdBy || this._createdBy.trim().length === 0) {
      throw new Error('Created by is required');
    }
    if (this._marginRules.length === 0) {
      throw new Error('At least one margin rule is required');
    }
  }
}