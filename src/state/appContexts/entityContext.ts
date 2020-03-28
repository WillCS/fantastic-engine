import { EntityModel, AssemblyList, Assembly, BoxList, Box } from '../../model/entityModel';
import { ControlButtonType, ControlButtonDescriptor } from '../../layout/control/ControlButton';
import { EditorContext } from '../editorContext';
import { EntityScene } from '../../graphics/scenes/entityScene';
import { Settings } from '../settings';

export class EntityContext extends EditorContext {
  public constructor(settings: Settings);
  public constructor(settings: Settings, model: EntityModel);

  public constructor(settings: Settings, model?: EntityModel) {
    super(new EntityScene(), model || new EntityModel(), settings);
    (this.scene as EntityScene).setContext(this);
  }

  public populateControlBar(): ControlButtonDescriptor[] {
    return [
      {
        key:     'assembly',
        type:    ControlButtonType.NEW_ASSEMBLY,
        title:   'Add a new Assembly',
        onClick: this.addAssembly
      }, { 
        key:     'component',
        type:    ControlButtonType.NEW_COMPONENT,
        title:   'Add a new Box',
        onClick: this.addBox
      }, { 
        key:     'texture',
        type:    ControlButtonType.NEW_TEXTURE,
        title:   'Add a new Texture'
      }, { 
        key:     'trash',
        type:    ControlButtonType.TRASH,
        title:   'Delete an object'
      }, { 
        key:     'exit',
        type:    ControlButtonType.EXIT,
        title:   'Exit'
      }
    ];
  }

  private addAssembly: (() => void) = () => {
    let parentList: AssemblyList | undefined = undefined;

    if(this.selection !== undefined) {
      if(this.selection instanceof Assembly) {
        parentList = this.selection.children;
      } else if(this.selection instanceof AssemblyList) {
        parentList = this.selection;
      } else {
        const parent = this.selection.getParent();

        if(this.selection instanceof Box) {
          parentList = ((parent as BoxList).getParent() as Assembly).children;
        } else if(parent && parent instanceof Assembly) {
          parentList = parent.children;
        }
      }
    } 

    if(parentList === undefined) {
      const model = (this.model as EntityModel);
      parentList = model.assemblies;
    }

    let newAssembly = new Assembly(parentList);

    parentList.assemblies.push(newAssembly);
    this.select(newAssembly);
  }

  private addBox: (() => void) = () => {
    let parentList: BoxList | undefined = undefined;

    if(this.selection !== undefined) {
      if(this.selection instanceof Assembly) {
        parentList = this.selection.cubes;
      } else if(this.selection instanceof BoxList) {
        parentList = this.selection;
      } else if(this.selection instanceof Box) {
        parentList = this.selection.getParent() as BoxList;
      } else if(this.selection.getParent()) {
        if(this.selection.getParent() instanceof Assembly) {
          parentList = (this.selection.getParent() as Assembly).cubes;
        }
      }
    } 

    if(parentList === undefined) {
      return;
    }

    let newBox = new Box(parentList);

    parentList.boxes.push(newBox);
    this.select(newBox);
  }
}
