import { Entity } from "../shared/Entity";
import { PricingProfileId } from "./value-objects/PricingProfileId";
import { MarginRuleSetReference } from "./value-objects/MarginRuleSetReference";
import { ProfileStatus } from "./enums/ProfileStatus";
import { Carrier } from "../value-objects/Carrier";
import { MarginRule } from "./MarginRule";
import { Percentage } from "./value-objects/Percentage";
import { RuleSetPurpose } from "./enums/RuleSetPurpose";

export class PricingProfile extends Entity<PricingProfileId> {
  private readonly _name: string;
  private readonly _description: string;
  private readonly _carrier: Carrier;
  private readonly _marginRuleSets: MarginRuleSetReference[];
  private _status: ProfileStatus;
  private readonly _createdBy: string;
  private readonly _createdDate: Date;
  private readonly _effectiveDate: Date;

  constructor(
    id: PricingProfileId,
    name: string,
    description: string,
    carrier: Carrier,
    marginRuleSets: MarginRuleSetReference[],
    createdBy: string,
    effectiveDate: Date,
    status: ProfileStatus = ProfileStatus.DRAFT
  ) {
    super(id);
    this._name = name;
    this._description = description;
    this._carrier = carrier;
    this._marginRuleSets = marginRuleSets;
    this._status = status;
    this._createdBy = createdBy;
    this._createdDate = new Date();
    this._effectiveDate = effectiveDate;

    this.validateState();
  }

  // Properties
  get name(): string {
    return this._name;
  }
  get description(): string {
    return this._description;
  }
  get carrier(): Carrier {
    return this._carrier;
  }
  get marginRuleSets(): MarginRuleSetReference[] {
    return [...this._marginRuleSets];
  }
  get status(): ProfileStatus {
    return this._status;
  }
  get createdBy(): string {
    return this._createdBy;
  }
  get createdDate(): Date {
    return new Date(this._createdDate);
  }
  get effectiveDate(): Date {
    return new Date(this._effectiveDate);
  }

  // Business Methods
  findApplicableRuleSet(
    date: Date = new Date()
  ): MarginRuleSetReference | undefined {
    return this._marginRuleSets
      .filter((ruleSet) => this.isRuleSetApplicable(ruleSet, date))
      .sort((a, b) => b.priority - a.priority)[0];
  }

  calculateMargin(
    country: string,
    weight: number,
    ruleSet: MarginRuleSetReference,
    marginRules: MarginRule[]
  ): Percentage | undefined {
    const applicableRule = marginRules
      .filter((rule) => rule.appliesTo(country, weight))
      .sort((a, b) => b.priority - a.priority)[0];

    return applicableRule?.margin;
  }

  activate(): void {
    if (this._status === ProfileStatus.ACTIVE) {
      throw new Error("Profile is already active");
    }
    this._status = ProfileStatus.ACTIVE;
  }

  deactivate(): void {
    if (this._status === ProfileStatus.INACTIVE) {
      throw new Error("Profile is already inactive");
    }
    this._status = ProfileStatus.INACTIVE;
  }

  private isRuleSetApplicable(
    ruleSet: MarginRuleSetReference,
    date: Date
  ): boolean {
    return date >= this._effectiveDate;
  }

  // Domain Rules
  private validateState(): void {
    if (!this._name || this._name.trim().length === 0) {
      throw new Error("Name is required");
    }
    if (!this._createdBy || this._createdBy.trim().length === 0) {
      throw new Error("Created by is required");
    }
    if (this._marginRuleSets.length === 0) {
      throw new Error("At least one margin rule set is required");
    }
    if (this._effectiveDate < this._createdDate) {
      throw new Error("Effective date cannot be before creation date");
    }
    this.validateRuleSetPriorities();
    this.validateRuleSetPurposes();
  }

  private validateRuleSetPriorities(): void {
    const priorities = this._marginRuleSets.map((rs) => rs.priority);
    if (new Set(priorities).size !== priorities.length) {
      throw new Error("Duplicate priorities are not allowed");
    }
  }

  private validateRuleSetPurposes(): void {
    const hasBase = this._marginRuleSets.some(
      (rs) => rs.purpose === RuleSetPurpose.BASE
    );
    if (!hasBase) {
      throw new Error("At least one base rule set is required");
    }

    const baseRuleSets = this._marginRuleSets.filter(
      (rs) => rs.purpose === RuleSetPurpose.BASE
    );
    if (baseRuleSets.length > 1) {
      throw new Error("Only one base rule set is allowed");
    }
  }
}
