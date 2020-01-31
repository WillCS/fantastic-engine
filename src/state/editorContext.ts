import { AppContext } from './context';
import { observable } from 'mobx';
import { Model } from '../model/model';
import { Scene } from '../graphics/scene';

export abstract class EditorContext extends AppContext {
  @observable
  public model: Model;

  @observable
  public selection: any;

  protected constructor(scene: Scene, model: Model) {
    super(scene);
    this.model = model;
  }
}
