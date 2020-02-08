import { EntityModel, AssemblyList, Assembly, BoxList, Box } from '../../model/entityModel';
import { ControlButtonType, ControlButtonDescriptor } from '../../layout/control/ControlButton';
import { EditorContext } from '../editorContext';
import { EntityScene } from '../../graphics/scenes/entityScene';

export class EntityContext extends EditorContext {
  public constructor();
  public constructor(model: EntityModel);

  public constructor(model?: EntityModel) {
    super(new EntityScene(), model || new EntityModel());
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
      } else if(this.selection instanceof Box) {
        parentList = ((this.selection.parent as BoxList).parent as Assembly).children;
      } else if(this.selection.parent) {
        if(this.selection.parent instanceof Assembly) {
          parentList = (this.selection.parent as Assembly).children;
        }
      }
    } 

    if(parentList === undefined) {
      const model = (this.model as EntityModel);
      parentList = model.assemblies;
    }

    let newAssembly = new Assembly(parentList);

    parentList.assemblies.push(newAssembly);
    this.selection = newAssembly;
  }

  private addBox: (() => void) = () => {
    let parentList: BoxList | undefined = undefined;

    if(this.selection !== undefined) {
      if(this.selection instanceof Assembly) {
        parentList = this.selection.cubes;
      } else if(this.selection instanceof BoxList) {
        parentList = this.selection;
      } else if(this.selection instanceof Box) {
        parentList = this.selection.parent as BoxList;
      } else if(this.selection.parent) {
        if(this.selection.parent instanceof Assembly) {
          parentList = (this.selection.parent as Assembly).cubes;
        }
      }
    } 

    if(parentList === undefined) {
      return;
    }

    let newBox = new Box(parentList);

    parentList.boxes.push(newBox);
    this.selection = newBox;
  }
}
