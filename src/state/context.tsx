import React from 'react';
import { ReactNode } from 'react';
import { ContextController } from './contextController';
import { ControlButton, ControlButtonType } from '../control/ControlButton';
import { Model } from '../model/model';
import { EntityModel } from '../model/entityModel';
import { ModelController } from './modelController';

export abstract class AppContext {
  public shouldDisplayDetailView(): boolean {
    return true;
  }

  public getModel(): Model | undefined {
    return undefined;
  }

  public getModelController(): ModelController | undefined {
    return undefined;
  }

  public hasModel(): boolean {
    return false;
  }
  
  public abstract populateControlBar(contextController: ContextController): ReactNode[];
}

export class DefaultContext extends AppContext {
  public static readonly DEFAULT_CONTEXT = new DefaultContext();

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
        onClick={this.createEntityModel(contextController)}
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

  private createEntityModel(contextController: ContextController): 
      (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void {
    return (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      contextController.setContext(new EntityContext())
    };
  }
}

export class EntityContext extends AppContext {
  private modelController: ModelController;

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
    return this.getModelController()?.getModel();
  }

  public getModelController(): ModelController | undefined {
    return this.modelController;
  }

  public hasModel(): boolean {
    return true;
  }
}