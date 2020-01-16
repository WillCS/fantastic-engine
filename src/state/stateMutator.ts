import { Model } from "../model/model";
import App from "../App";
import { AppContext } from "./context";

export class StateMutator {
  private selectionChangeListeners: ((selection: any | undefined) => void)[];
  private contextChangeListeners:   ((context: AppContext)        => void)[];
  private modelChangeListeners:     ((model: Model | undefined)   => void)[];

  public constructor(private stateOwner: App) {
    this.selectionChangeListeners = [];
    this.contextChangeListeners   = [];
    this.modelChangeListeners     = [];

    this.setSelection = this.setSelection.bind(this);
    this.setContext   = this.setContext.bind(this);
    this.setModel     = this.setModel.bind(this);

    this.getSelection = this.getSelection.bind(this);
    this.getContext   = this.getContext.bind(this);
    this.getModel     = this.getModel.bind(this);

    this.registerSelectionChangeListener = this.registerSelectionChangeListener.bind(this);
    this.registerContextChangeListener   = this.registerContextChangeListener.bind(this);
    this.registerModelChangeListener     = this.registerModelChangeListener.bind(this);

    this.deregisterSelectionChangeListener = this.deregisterSelectionChangeListener.bind(this);
    this.deregisterContextChangeListener   = this.deregisterContextChangeListener.bind(this);
    this.deregisterModelChangeListener     = this.deregisterModelChangeListener.bind(this);
  }

  public setSelection(newSelection: any | undefined): void {
    this.stateOwner.setState({
      context:   this.stateOwner.state.context,
      selection: newSelection,
      model:     this.stateOwner.state.model
    });

    this.selectionChangeListeners.forEach(listener => listener(newSelection));
  }

  public getSelection(): any | undefined {
    return this.stateOwner.state.selection;
  }

  public setContext(newContext: AppContext): void {
    this.stateOwner.setState({
      context:   newContext,
      selection: this.stateOwner.state.selection,
      model:     this.stateOwner.state.model
    });


    this.contextChangeListeners.forEach(listener => listener(newContext));
  }

  public getContext(): AppContext {
    return this.stateOwner.state.context;
  }

  public setModel(updatedModel: Model | undefined): void {
    this.stateOwner.setState({
      context:   this.stateOwner.state.context,
      selection: this.stateOwner.state.selection,
      model:     updatedModel
    });

    this.modelChangeListeners.forEach(listener => listener(updatedModel));
  }

  public getModel(): Model | undefined {
    return this.stateOwner.state.model;
  }

  public registerSelectionChangeListener(listener: (selection: any | undefined) => void): void {
    if(!this.selectionChangeListeners.includes(listener)) {
      this.selectionChangeListeners.push(listener);
    }
  }

  public deregisterSelectionChangeListener(listener: (selection: any | undefined) => void): void {
    if(this.selectionChangeListeners.includes(listener)) {
      this.selectionChangeListeners.filter(that => that !== listener);
    }
  }

  public registerContextChangeListener(listener: (context: AppContext) => void): void {
    if(!this.contextChangeListeners.includes(listener)) {
      this.contextChangeListeners.push(listener);
    }
  }

  public deregisterContextChangeListener(listener: (context: AppContext) => void): void {
    if(this.contextChangeListeners.includes(listener)) {
      this.contextChangeListeners.filter(that => that !== listener);
    }
  }

  public registerModelChangeListener(listener: (model: Model | undefined) => void): void {
    if(!this.modelChangeListeners.includes(listener)) {
      this.modelChangeListeners.push(listener);
    }
  }

  public deregisterModelChangeListener(listener: (model: Model | undefined) => void): void {
    if(this.modelChangeListeners.includes(listener)) {
      this.modelChangeListeners.filter(that => that !== listener);
    }
  }
}
