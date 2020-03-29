import { AppContext } from './context';
import { observable } from 'mobx';
import { Model } from '../model/model';
import { Scene } from '../graphics/scene';
import { OrbitalCamera } from '../graphics/camera';
import { Settings } from './settings';
import { Change } from './change';
import { Selectable } from './selection';
import { ControlButtonDescriptor, ControlButtonType } from '../layout/control/ControlButton';

export abstract class EditorContext extends AppContext {
  @observable
  public model: Model;

  @observable
  public selection?: Selectable;

  @observable
  public history: Change[];

  @observable
  public undoneHistory: Change[];

  protected panning:    boolean;
  protected lastMouseX: number;
  protected lastMouseY: number;

  protected constructor(scene: Scene, model: Model, settings: Settings) {
    super(settings, scene);
    this.model = model;

    this.history       = [];
    this.undoneHistory = [];

    this.panning    = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
  }

  public populateControlBar(): ControlButtonDescriptor[] {
    return [
      { 
        key:     'trash',
        type:    ControlButtonType.TRASH,
        title:   'Delete an object'
      }, {
        key:     'undo',
        type:    ControlButtonType.NEW_ASSEMBLY,
        title:   'Undo an action',
        onClick: this.undo
      }, { 
        key:     'redo',
        type:    ControlButtonType.NEW_COMPONENT,
        title:   'Redo a previously undone action',
        onClick: this.redo
      }, { 
        key:     'exit',
        type:    ControlButtonType.EXIT,
        title:   'Exit'
      }
    ];
  }

  public makeChange(change: Change): void {
    this.applyChange(change);
    this.undoneHistory = [];
  }

  public onMouseDown(x: number, y: number, button: number): void {
    if(!this.panning && button === 0) {
      document.addEventListener('mouseup',   this.endPanning, { capture: true });

      this.panning = true;
      this.lastMouseX = x;
      this.lastMouseY = y;
    }
  }

  public onMouseMoved(x: number, y: number): void  {
    if(this.panning) {
      const deltaX = x - this.lastMouseX;
      const deltaY = y - this.lastMouseY;

      const sensitivity = 0.001;

      (this.scene.getCamera() as OrbitalCamera).azimuth     += deltaX * sensitivity;
      (this.scene.getCamera() as OrbitalCamera).inclination -= deltaY * sensitivity;

      this.lastMouseX = x;
      this.lastMouseY = y;
    }
  }

  private endPanning = (event: MouseEvent) => {
    document.removeEventListener('mouseup',   this.endPanning, { capture: true });

    if(this.panning && event.button === 0) {
      this.panning = false;
    }

    event.stopPropagation();
  }

  public onMouseUp(x: number, y: number, button: number): void  { }

  public onScrolled(delta: number): void {
    if(this.scene.getCamera() instanceof OrbitalCamera) {
      const camera: OrbitalCamera = this.scene.getCamera() as OrbitalCamera;
      camera.radius += delta;
    }
  }

  public select(selectable: Selectable): void {
    this.selection = selectable;
  }

  private applyChange(change: Change): void {
    change.apply();

    this.history.push(change);

    if(this.history.length > this.settings.changeHistoryMaxSize) {
      this.history.shift();
    }
  }

  private undo = () => {
    const changeToUndo = this.history.pop();

    if(changeToUndo) {
      changeToUndo.revert();
      this.undoneHistory.push(changeToUndo);

      if(this.undoneHistory.length > this.settings.changeHistoryMaxSize) {
        this.undoneHistory.shift();
      }
    }
  }

  private redo = () => {
    const changeToRedo = this.undoneHistory.pop();

    if(changeToRedo) {
      this.applyChange(changeToRedo);
    }
  }
}
