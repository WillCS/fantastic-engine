import { ControlButtonType, ControlButtonDescriptor } from '../../layout/control/ControlButton';
import { AppContext } from '../context';
import { EntityContext } from './entityContext';
import { Scene } from '../../graphics/scene';
import { ContextStore } from '../contextStore';

export class DefaultContext extends AppContext {
  public constructor(private contextStore: ContextStore, scene: Scene) {
    super(scene);
  }

  public populateControlBar(): ControlButtonDescriptor[] {
    return [
      {
        key:     'entity',
        type:    ControlButtonType.ENTITY_MODEL,
        title:   'Create new Entity Model',
        onClick: this.handleEntityButtonClicked
      },
      { 
        key:     'json',
        type:    ControlButtonType.JSON_MODEL,
        title:   'Create new JSON Model'
      },
      {
        key:     'load',
        type:    ControlButtonType.LOAD_MODEL,
        title:   'Load a model from your PC'
      }
    ];
  }

  private handleEntityButtonClicked: (() => void) = () => {
      this.contextStore.context = new EntityContext();
  }
}
