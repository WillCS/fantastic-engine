import { TreeViewItem } from "../layout/tree/tree";
import { Selectable } from "../state/selection";

export interface Model extends TreeViewItem {

}

export interface CollectionObject<T> {
  getChildren(): T[];
  size(): number;
  addChild(child: T, index?: number): void;
  removeChild(child: T): number | undefined;
  copyTo(newParent: Selectable): CollectionObject<T>;
}