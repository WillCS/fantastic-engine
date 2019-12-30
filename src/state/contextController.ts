import App from "../App";
import { AppContext } from "./context";

export class ContextController {
  constructor(private app: App) {

  }

  public setContext(newContext: AppContext): void {
    this.app.setState({context: newContext});
  }

  public getContext(): AppContext {
    return this.app.state.context;
  }
}