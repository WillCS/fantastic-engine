import App from "../App";
import { AppContext } from "./context";

export class ContextController {
  private contextChangeListeners: ((context: AppContext) => void)[];

  constructor(private app: App) {
    this.contextChangeListeners = [];
  }

  public registerContextChangeListener(listener: (context: AppContext) => void): void {
    if(!this.contextChangeListeners.includes(listener)) {
      this.contextChangeListeners.push(listener);
    }
  }

  public deregisterContextChangeListener(listener: (context: AppContext) => void): void {
    if(this.contextChangeListeners.includes(listener)) {
      this.contextChangeListeners = this.contextChangeListeners.filter(remaining => {
        return remaining !== listener;
      });
    }
  }

  public setContext(newContext: AppContext): void {
    this.app.setState({context: newContext});

    this.contextChangeListeners.forEach(listener => listener(newContext));
  }

  public getContext(): AppContext {
    return this.app.state.context;
  }
}
