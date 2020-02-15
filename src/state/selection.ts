export class SelectionContainer {
  private selectedItems: any[];

  public constructor(...items: any[]) {
    this.selectedItems = items;
  }

  public isSelected(item: any): boolean {
    return this.selectedItems.includes(item);
  }

  public select(...items: any[]): void {
    this.selectedItems = items;
  }

  public addToSelection(...items: any[]): void {
    this.selectedItems = this.selectedItems.concat(items);
  }

  public removeFromSelection(...items: any[]): void {
    this.selectedItems = this.selectedItems.filter(
      selected => !items.includes(selected))
  }

  public forEach(fn: (selectedItem: any) => void): void {
    this.selectedItems.forEach(item => fn(item));
  }

  public count(): number {
    return this.selectedItems.length;
  }

  public get(): any {
    if(this.selectedItems.length === 1) {
      return this.selectedItems[0];
    } else {
      return this.selectedItems;
    }
  }
}
