import { AppContext } from "../context";
import { ModelController } from "../modelController";
import { EntityModel } from "../../model/entityModel";
import { ContextController } from "../contextController";
import React, { ReactNode } from "react";
import { ControlButton, ControlButtonType } from "../../control/ControlButton";
import { Model } from "../../model/model";
import { EntityScene, Scene } from "../../graphics/scene";

export class EntityContext extends AppContext {
  private modelController: ModelController;
  private scene: Scene | undefined;

  constructor() {
    super();
    this.modelController = new ModelController(new EntityModel());
  }

  public populateControlBar(contextController: ContextController): ReactNode[] {
    return [
      <ControlButton key={'assembly'}
        type={ControlButtonType.NEW_ASSEMBLY}
        title='Add a new Assembly'
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
}
