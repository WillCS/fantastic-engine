import { ContextController } from "../contextController";
import React, { ReactNode } from "react";
import { ControlButton, ControlButtonType } from "../../control/ControlButton";
import { AppContext } from "../context";
import { EntityContext } from "./entityContext";
import { Scene } from "../../graphics/scene";
import { DefaultScene } from "../../graphics/scenes/defaultScene";

export class DefaultContext extends AppContext {
  public static readonly DEFAULT_CONTEXT = new DefaultContext();
  private scene: Scene | undefined;

  private constructor() {
    super();
  }

  public shouldDisplayDetailView(): boolean {
    return false;
  }

  public populateControlBar(contextController: ContextController): ReactNode[] {
    return [
      <ControlButton key={'entity'}
        type={ControlButtonType.ENTITY_MODEL}
        title='Create new Entity Model'
        onClick={this.createEntityContext(contextController)}
      />,
      <ControlButton key={'json'}
        type={ControlButtonType.JSON_MODEL}
        title='Create new JSON Model'
      />,
      <ControlButton key={'load'}
        type={ControlButtonType.LOAD_MODEL}
        title='Load a model from your PC'
      />
    ];
  }

  public createScene(webGL: WebGLRenderingContext): void {
    this.scene = new DefaultScene(webGL);
  }

  public getScene(): Scene | undefined {
    return this.scene;
  }

  private createEntityContext(contextController: ContextController): 
      (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void {
    return (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      contextController.setContext(new EntityContext())
    };
  }
}
