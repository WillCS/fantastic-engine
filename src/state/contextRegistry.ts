import { AppContext } from "./context";
import { DefaultContext } from './appContexts/defaultContext'

export class ContextRegistry {
  public static readonly DEFAULT_CONTEXT: AppContext = DefaultContext.DEFAULT_CONTEXT;
}
