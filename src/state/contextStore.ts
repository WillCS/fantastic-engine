import { AppContext } from "./context";
import { DefaultContext } from "./appContexts/defaultContext";
import { observable } from "mobx";
import { Settings } from "./settings";

export class ContextStore {
  @observable
  public context:      AppContext;

  private oldContext?: AppContext;

  public contextChanged: boolean;

  public constructor(
    private settings: Settings
  ) {
    this.context        = new DefaultContext(this, this.settings);
    this.contextChanged = true;
  }

  public getPreviousContext(): AppContext | undefined {
    return this.oldContext;
  }

  public updateContext(newContext: AppContext): void {
    this.context        = newContext;
    this.oldContext     = this.context;
    this.contextChanged = true;
  }
}
