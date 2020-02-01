import { ControlButtonType, ControlButtonDescriptor } from '../../layout/control/ControlButton';
import { AppContext } from '../context';
import { EntityContext } from './entityContext';
import { ContextStore } from '../contextStore';
import { DefaultScene } from '../../graphics/scenes/defaultScene';

export class DefaultContext extends AppContext {
  public constructor(private contextStore: ContextStore) {
    super(new DefaultScene());
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
      this.contextStore.updateContext(new EntityContext());
  }
}
