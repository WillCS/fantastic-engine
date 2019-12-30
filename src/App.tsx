import React from 'react';
import { Component, ReactNode } from 'react';
import './App.css';
import { Panel } from './layout/Panel';
import { AppContext, DefaultContext } from './state/context';
import { ContextController } from './state/contextController';

export interface AppState {
  context: AppContext;
}

export default class App extends Component<any, AppState, any> {
  private contextController: ContextController;

  public constructor(props: any) {
    super(props);
    this.state = {
      context: DefaultContext.DEFAULT_CONTEXT
    };

    this.contextController = new ContextController(this);
  }

  public render(): ReactNode {
    return (
      <Panel
        context={this.state.context}
        contextController={this.contextController}
      />
    );
  }
}