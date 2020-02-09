import { AppContext } from './context';
import { observable } from 'mobx';
import { Model } from '../model/model';
import { Scene } from '../graphics/scene';
import { OrbitalCamera } from '../graphics/camera';

export abstract class EditorContext extends AppContext {
  @observable
  public model: Model;

  @observable
  public selection: any;

  protected panning: boolean;

  protected constructor(scene: Scene, model: Model) {
    super(scene);
    this.model = model;

    this.panning = false;
  }

  public onMouseDown(x: number, y: number, button: number): void {
    if(!this.panning && button === 1) {
      this.panning = true;
    }

    console.log(this.scene.castRay(x, y));
  }

  public onMouseMoved(x: number, y: number): void  {
    console.log(this.panning);
  }

  public onMouseUp(x: number, y: number, button: number): void  {
    if(this.panning && button === 1) {
      this.panning = false;
    }
  }

  public onScrolled(delta: number): void  {
    if(this.scene.getCamera() instanceof OrbitalCamera) {
      const camera: OrbitalCamera = this.scene.getCamera() as OrbitalCamera;
      camera.radius += delta;
    }
  }
}
