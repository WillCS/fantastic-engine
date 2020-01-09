import { AppContext } from "../context";
import { ModelController } from "../modelController";
import { EntityModel, AssemblyList, Assembly } from "../../model/entityModel";
import { ContextController } from "../contextController";
import React, { ReactNode } from "react";
import { ControlButton, ControlButtonType } from "../../control/ControlButton";
import { Model } from "../../model/model";
import { Scene } from "../../graphics/scene";
import { EntityScene } from "../../graphics/scenes/entityScene";

export class EntityContext extends AppContext {
  private modelController: ModelController;
  private scene: Scene | undefined;

  constructor() {
    super();
    this.modelController = new ModelController(new EntityModel());
    
    this.addAssembly = this.addAssembly.bind(this);
  }

  public populateControlBar(contextController: ContextController): ReactNode[] {
    return [
      <ControlButton key={'assembly'}
        type={ControlButtonType.NEW_ASSEMBLY}
        title='Add a new Assembly'
        onClick={this.addAssembly}
      />,
      <ControlButton key={'component'}
        type={ControlButtonType.NEW_COMPONENT}
        title='Add a new Box'
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

  public getModel(): Model | undefined {
    return this.hasModel()
      ? this.getModelController()!.getModel()
      : undefined;
  }

  public getModelController(): ModelController | undefined {
    return this.modelController;
  }

  public hasModel(): boolean {
    return true;
  }

  public createScene(webGL: WebGLRenderingContext): void {
    this.scene = new EntityScene();
  }

  public getScene(): Scene | undefined {
    return this.scene;
  }

  private addAssembly(): void {
    const currentSelection = this.modelController.getSelection();
    let parentList: AssemblyList | undefined = undefined;

    if(currentSelection !== undefined) {
      if(currentSelection instanceof Assembly) {
        parentList = currentSelection.children;
      } else if(currentSelection instanceof AssemblyList) {
        parentList = currentSelection;
      }
    } 

    if(parentList === undefined) {
      const model = (this.modelController.getModel()) as EntityModel;
      parentList = model.assemblies;
    }

    let newAssembly = new Assembly();

    parentList.assemblies.push(newAssembly);
    this.modelController.setSelection(newAssembly);
  }
}
