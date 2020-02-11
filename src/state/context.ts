import { Scene } from '../graphics/scene';
import { observable } from 'mobx';
import { ControlButtonDescriptor } from '../layout/control/ControlButton';

export abstract class AppContext {
  @observable
  public scene: Scene;

  @observable
  public settingsOpen: boolean;

  protected constructor(scene: Scene) {
    this.scene = scene;
    this.settingsOpen = false;
  }

  public abstract populateControlBar(): ControlButtonDescriptor[];

  public onMouseDown(x: number, y: number, button: number): void { }
  public onMouseMoved(x: number, y: number): void  { }
  public onMouseUp(x: number, y: number, button: number): void  { }
  public onScrolled(delta: number): void  { }
}
