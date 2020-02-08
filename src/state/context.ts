import { Scene } from '../graphics/scene';
import { observable } from 'mobx';
import { ControlButtonDescriptor } from '../layout/control/ControlButton';

export abstract class AppContext {
  @observable
  public scene: Scene;

  protected constructor(scene: Scene) {
    this.scene = scene;
  }

  public abstract populateControlBar(): ControlButtonDescriptor[];
}
