import { AppContext } from "../context";
import { EntityModel, AssemblyList, Assembly, BoxList, Box } from "../../model/entityModel";
import React, { ReactNode } from "react";
import { ControlButton, ControlButtonType } from "../../layout/control/ControlButton";
import { Scene } from "../../graphics/scene";
import { EntityScene } from "../../graphics/scenes/entityScene";
import { StateMutator } from "../stateMutator";
import { Model } from "../../model/model";

export class EntityContext extends AppContext {
  private scene: Scene | undefined;

  public constructor(private stateMutator: StateMutator) {
    super();
    
    this.addAssembly = this.addAssembly.bind(this);
    this.addBox      = this.addBox.bind(this);
  }

  public populateControlBar(): ReactNode[] {
    return [
      <ControlButton key={'assembly'}
        type={ControlButtonType.NEW_ASSEMBLY}
        title='Add a new Assembly'
        onClick={this.addAssembly}
      />,
      <ControlButton key={'component'}
        type={ControlButtonType.NEW_COMPONENT}
        title='Add a new Box'
        onClick={this.addBox}
      />,
      <ControlButton key={'texture'}
        type={ControlButtonType.NEW_TEXTURE}
        title='Add a new Texture'
      />,
      <ControlButton key={'trash'}
        type={ControlButtonType.TRASH}
        title='Delete an object'
      />,
      <ControlButton key={'exit'}
        type={ControlButtonType.EXIT}
        title='Exit'
      />
    ];
  }

  public hasModel(): boolean {
    return true;
  }

  public createScene(webGL: WebGLRenderingContext): void {
    this.scene = new EntityScene(webGL,
      this.stateMutator.getModel()!,
      this.stateMutator.registerModelChangeListener,
      this.stateMutator.deregisterModelChangeListener
    );
  }

  public getScene(): Scene | undefined {
    return this.scene;
  }

  public createModel(): Model | undefined {
    return new EntityModel();
  }

  private addAssembly(): void {
    const currentSelection = this.stateMutator.getSelection();
    let parentList: AssemblyList | undefined = undefined;

    if(currentSelection !== undefined) {
      if(currentSelection instanceof Assembly) {
        parentList = currentSelection.children;
      } else if(currentSelection instanceof AssemblyList) {
        parentList = currentSelection;
      } else if(currentSelection instanceof Box) {
        parentList = ((currentSelection.parent as BoxList).parent as Assembly).children;
      } else if(currentSelection.parent) {
        if(currentSelection.parent instanceof Assembly) {
          parentList = (currentSelection.parent as Assembly).children;
        }
      }
    } 

    if(parentList === undefined) {
      const model = (this.stateMutator.getModel()) as EntityModel;
      parentList = model.assemblies;
    }

    let newAssembly = new Assembly(parentList);

    parentList.assemblies.push(newAssembly);
    this.stateMutator.setSelection(newAssembly);
  }

  private addBox(): void {
    const currentSelection = this.stateMutator.getSelection();
    let parentList: BoxList | undefined = undefined;

    if(currentSelection !== undefined) {
      if(currentSelection instanceof Assembly) {
        parentList = currentSelection.cubes;
      } else if(currentSelection instanceof BoxList) {
        parentList = currentSelection;
      } else if(currentSelection instanceof Box) {
        parentList = currentSelection.parent as BoxList;
      } else if(currentSelection.parent) {
        if(currentSelection.parent instanceof Assembly) {
          parentList = (currentSelection.parent as Assembly).cubes;
        }
      }
    } 

    if(parentList === undefined) {
      return;
    }

    let newBox = new Box(parentList);

    parentList.boxes.push(newBox);
    this.stateMutator.setSelection(newBox);
  }
}
