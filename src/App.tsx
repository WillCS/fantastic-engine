import React from 'react';
import { Component, ReactNode } from 'react';
import './App.css';
import { Viewport } from './layout/Viewport';
import { DetailView } from './layout/DetailView';
import { ControlBar } from './layout/ControlBar';
import { AppContext } from './state/context';
import { RenderManager } from './graphics/renderManager';
import { Model } from './model/model';
import { StateMutator } from './state/stateMutator';
import { DefaultContext } from './state/appContexts/defaultContext';

export interface AppState {
  context:   AppContext;
  selection: any | undefined;
  model:     Model | undefined;
}

export default class App extends Component<any, AppState, any> {
  private stateMutator:  StateMutator;
  private renderManager: RenderManager;

  public constructor(props: any) {
    super(props);

    this.renderManager = new RenderManager();
    this.stateMutator  = new StateMutator(this);

    this.state = {
      context:   new DefaultContext(this.stateMutator),
      selection: undefined,
      model:     undefined
    };

    this.createNewModel = this.createNewModel.bind(this);
  }

  public componentDidMount(): void {
    this.stateMutator.registerContextChangeListener(this.renderManager.contextChanged);
    this.stateMutator.registerContextChangeListener(this.createNewModel)
  }

  public componentWillUnmount(): void {
    this.stateMutator.deregisterContextChangeListener(this.renderManager.contextChanged);
    this.stateMutator.deregisterContextChangeListener(this.createNewModel)
  }

  public render(): ReactNode {
    return (
      <div className='appContainer'>
        <ControlBar>
          { this.state.context.populateControlBar() }
        </ControlBar>

        <DetailView 
          show={this.state.context.shouldDisplayDetailView()}
          model={this.state.model}
          updateModel={this.stateMutator.setModel}
          selection={this.state.selection}
          setSelection={this.stateMutator.setSelection}
        />

        <Viewport 
          context={this.state.context}
          renderManager={this.renderManager}
        />
      </div>
    );
  }

  private createNewModel(context: AppContext): void {
    this.setState({
      context:   context,
      model:     context.createModel(),
      selection: this.state.selection
    });
  }
}
