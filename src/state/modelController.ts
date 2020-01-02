import { Model } from "../model/model";

export class ModelController {
  private modelChangeListeners:     ((model: Model)   => void)[];
  private selectionChangeListeners: ((selection: any) => void)[];
  private selection:                any | undefined;

  public constructor(private model: Model) {
    this.modelChangeListeners     = [];
    this.selectionChangeListeners = [];

    this.getSelection = this.getSelection.bind(this);
    this.setSelection = this.setSelection.bind(this);
  }

  public getModel(): Model {
    return this.model;
  }

  public getSelection(): any | undefined {
    return this.selection;
  }

  public setSelection(selection: any | undefined): void {
    this.selection = selection;

    this.selectionChangeListeners.forEach(listener => {
      listener(selection);
    });
  }

  public registerModelChangeListener(listener: (model: Model) => void): void {
    if(!this.modelChangeListeners.includes(listener)) {
      this.modelChangeListeners.push(listener);
    }
  }

  public deregisterModelChangeListener(listener: (model: Model) => void): void {
    if(this.modelChangeListeners.includes(listener)) {
      this.modelChangeListeners.filter(that => that !== listener);
    }
  }

  public registerSelectionChangeListener(listener: (selection: any) => void): void {
    if(!this.selectionChangeListeners.includes(listener)) {
      this.selectionChangeListeners.push(listener);
    }
  }

  public deregisterSelectionChangeListener(listener: (selection: any) => void): void {
    if(this.selectionChangeListeners.includes(listener)) {
      this.selectionChangeListeners.filter(that => that !== listener);
    }
  }
}
