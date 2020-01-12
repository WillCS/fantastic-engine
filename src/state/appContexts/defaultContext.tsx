import React, { ReactNode } from "react";
import { ControlButton, ControlButtonType } from "../../layout/control/ControlButton";
import { AppContext } from "../context";
import { EntityContext } from "./entityContext";
import { Scene } from "../../graphics/scene";
import { DefaultScene } from "../../graphics/scenes/defaultScene";
import { StateMutator } from "../stateMutator";
import { Model } from "../../model/model";

export class DefaultContext extends AppContext {
  private scene: Scene | undefined;

  public constructor(private stateMutator: StateMutator) {
    super();

    this.handleEntityButtonClicked = this.handleEntityButtonClicked.bind(this);
  }

  public shouldDisplayDetailView(): boolean {
    return false;
  }

  public populateControlBar(): ReactNode[] {
    return [
      <ControlButton key={'entity'}
        type={ControlButtonType.ENTITY_MODEL}
        title='Create new Entity Model'
        onClick={this.handleEntityButtonClicked}
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

  public createModel(): Model | undefined {
    return undefined;
  }

  private handleEntityButtonClicked() {
      this.stateMutator.setContext(new EntityContext(this.stateMutator));
  }
}
