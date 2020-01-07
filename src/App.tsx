import React from 'react';
import { Component, ReactNode } from 'react';
import './App.css';
import { AppContext, DefaultContext } from './state/context';
import { ContextController } from './state/contextController';
import { Viewport } from './layout/Viewport';
import { DetailView } from './layout/DetailView';
import { ControlBar } from './layout/ControlBar';

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
        />

        {/* <img
          className='backgroundLogo'
          src={logo}
          alt='Mineventor'
        /> */}
      </div>
    );
  }
}