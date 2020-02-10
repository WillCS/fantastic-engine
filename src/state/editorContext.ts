import { AppContext } from './context';
import { observable } from 'mobx';
import { Model } from '../model/model';
import { Scene } from '../graphics/scene';
import { OrbitalCamera } from '../graphics/camera';
import { Sphere } from '../math/geometry';

export abstract class EditorContext extends AppContext {
  @observable
  public model: Model;

  @observable
  public selection: any;

  protected panning:        boolean;

  protected constructor(scene: Scene, model: Model) {
    super(scene);
    this.model = model;

    this.panning        = false;
  }

  public onMouseDown(x: number, y: number, button: number): void {
    if(!this.panning && button === 1) {
      // const ray = this.scene.castRay(x, y);

      // const cameraDist   = (this.scene.getCamera() as OrbitalCamera).radius * 1.5;
      // const cameraOrigin = (this.scene.getCamera() as OrbitalCamera).origin;

      // const intersectPos = new Sphere(cameraOrigin, cameraDist).intersect(ray);

      // calculate altitude and azimuth of point on sphere and hold onto it
    }
  }

  public onMouseMoved(x: number, y: number): void  {
    if(this.panning) {
      // const ray = this.scene.castRay(x, y);
      
      // const cameraDist   = (this.scene.getCamera() as OrbitalCamera).radius * 1.5;
      // const cameraOrigin = (this.scene.getCamera() as OrbitalCamera).origin;

      // const intersectPos = new Sphere(cameraOrigin, cameraDist).intersect(ray);

      // calculate altitude and azimuth of point on sphere and compare to 
      // start of panning - use delta to move camera
    }
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
