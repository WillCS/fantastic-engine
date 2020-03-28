export abstract class Change {
  public constructor(
    public objectChanged: any
  ) { };
}

export class FieldChange extends Change {
  public constructor(
    objectChanged:           any,
    public changedFieldName: string,
    public previousValue:    any,
    public newValue:         any,
  ) { super(objectChanged) }
}

export class ItemAddedChange extends Change {
  public constructor(
    objectChanged:    any,
    public itemAdded: any
  ) { super(objectChanged) }
}

export class ItemRemovedChange extends Change {
  public constructor(
    objectChanged:    any,
    public itemRemoved: any
  ) { super(objectChanged) }
}
