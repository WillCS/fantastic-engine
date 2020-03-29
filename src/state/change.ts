import { CollectionObject } from "../model/model";

export abstract class Change {
  public constructor(
    public objectChanged: any
  ) { };

  public abstract apply(): void;
  public abstract revert(): void;
}

export class FieldChange extends Change {
  public constructor(
    objectChanged:           any,
    public changedFieldName: string,
    public previousValue:    any,
    public newValue:         any,
  ) { super(objectChanged) }

  public apply(): void {
    this.objectChanged[this.changedFieldName] = this.newValue;
  }

  public revert(): void {
    this.objectChanged[this.changedFieldName] = this.previousValue;
  }
}

export class ItemAddedChange<T> extends Change {
  public constructor(
    objectChanged:    CollectionObject<T>,
    public itemAdded: T
  ) { super(objectChanged) }

  public apply(): void {
    this.objectChanged.addChild(this.itemAdded);
  }

  public revert(): void {
    this.objectChanged.removeChild(this.itemAdded);
  }
}

export class ItemRemovedChange<T> extends Change {
  public constructor(
    objectChanged:      CollectionObject<T>,
    public itemRemoved: T,
    public itemIndex:   number
  ) { super(objectChanged) }

  public apply(): void {
    this.objectChanged.removeChild(this.itemRemoved);
  }

  public revert(): void {
    this.objectChanged.addChild(this.itemRemoved, this.itemIndex);
  }
}
