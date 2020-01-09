import { ReactNode } from 'react';
import { ContextController } from './contextController';
import { Model } from '../model/model';
import { ModelController } from './modelController';
import { Scene } from '../graphics/scene';

export abstract class AppContext {
  public abstract populateControlBar(contextController: ContextController): ReactNode[];
  public abstract getScene(): Scene | undefined;
  public abstract createScene(webGL: WebGLRenderingContext): void;

  public shouldDisplayDetailView(): boolean { return true; }

  public getModel(): Model | undefined { return undefined; }

  public getModelController(): ModelController | undefined { return undefined; }

  public hasModel(): boolean { return false; }
}
