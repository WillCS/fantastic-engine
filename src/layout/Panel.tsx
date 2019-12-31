import React from 'react';
import { Component, ReactNode } from 'react';
import './Layout.css';
import { ControlBar } from './ControlBar';
import { DetailView } from './DetailView';
import { ContextController } from '../state/contextController';
import { AppContext } from '../state/context';

export interface PanelProps {
    context: AppContext,
    contextController: ContextController
}

export class Panel extends Component<PanelProps> {
  constructor(props: PanelProps) {
    super(props);
  }

  public render(): ReactNode {
    return (
      <span className='panel'>
          <ControlBar
            context={this.props.context}
            contextController={this.props.contextController}
          />
          <DetailView 
            context={this.props.context}/>
      </span>
    );
  }
}