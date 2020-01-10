import { ReactNode } from 'react';
import { Model } from '../model/model';
import { Scene } from '../graphics/scene';

export abstract class AppContext {
  public abstract populateControlBar(): ReactNode[];
  public abstract getScene(): Scene | undefined;
  public abstract createScene(webGL: WebGLRenderingContext): void;
  public abstract createModel(): Model | undefined;

  public shouldDisplayDetailView(): boolean { return true; }

  public hasModel(): boolean { return false; }
}
