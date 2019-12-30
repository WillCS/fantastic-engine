import React from 'react';
import { Component, ReactNode } from 'react';
import './App.css';
import { Panel } from './layout/Panel';
import { AppContext, DefaultContext } from './state/context';

export interface AppState {
  context: AppContext;
}

export default class App extends Component<any, AppState, any> {
  public constructor(props: any) {
    super(props);
    this.state = {
      context: DefaultContext.DEFAULT_CONTEXT
    };
  }

  public render(): ReactNode {
    return (
      <Panel
        context={this.state.context}
      />
    );
  }
}