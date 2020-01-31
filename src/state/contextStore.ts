import { observable } from "mobx";
import { AppContext } from "./context";
import { DefaultContext } from "./appContexts/defaultContext";
import { Scene } from "../graphics/scene";

export class ContextStore {
  @observable
  public context: AppContext;

  public constructor(scene: Scene) {
    this.context = new DefaultContext(this, scene);
  }
}
