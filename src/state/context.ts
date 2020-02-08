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

  public onMouseDown(x: number, y: number, button: number): void { }
  public onMouseMoved(x: number, y: number): void  { }
  public onMouseUp(x: number, y: number, button: number): void  { }
  public onScrolled(delta: number): void  { }
}
