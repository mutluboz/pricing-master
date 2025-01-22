export abstract class Entity<T> {
  protected readonly id: T;

  constructor(id: T) {
    this.id = id;
  }

  equals(other: Entity<T>): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    if (!(other instanceof Entity)) {
      return false;
    }
    return this.id === other.id;
  }
}