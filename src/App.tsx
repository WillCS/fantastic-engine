import React from 'react';
import { Component, ReactNode } from 'react';
import './App.css';
import { ContextController } from './state/contextController';
import { ContextRegistry } from './state/contextRegistry';
import { Viewport } from './layout/Viewport';
import { DetailView } from './layout/DetailView';
import { ControlBar } from './layout/ControlBar';
import { AppContext } from './state/context';
import { RenderManager } from './graphics/renderManager';

export interface AppState {
  context: AppContext;
}

export default class App extends Component<any, AppState, any> {
  private contextController: ContextController;
  private renderManager: RenderManager;

  public constructor(props: any) {
    super(props);
    this.state = {
      context: ContextRegistry.DEFAULT_CONTEXT
    };

    this.contextController = new ContextController(this);
    this.renderManager = new RenderManager();
  }

  public componentDidMount(): void {
    this.contextController.registerContextChangeListener(this.renderManager.contextChanged);
  }

  public componentWillUnmount(): void {
    this.contextController.deregisterContextChangeListener(this.renderManager.contextChanged);
  }

  public render(): ReactNode {
    return (
      <div className='appContainer'>
        <ControlBar
          context={this.state.context}
          contextController={this.contextController}
        />
        <DetailView 
          context={this.state.context}
        />
        <Viewport 
          context={this.state.context}
          renderManager={this.renderManager}
        />
      </div>
    );
  }
}
