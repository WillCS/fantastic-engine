import React from 'react';
import { Component, ReactNode } from 'react';
import './Layout.css';
import { ControlBar } from './ControlBar';
import { DetailView } from './DetailView';
import { AppContext } from '../state/context';

export interface PanelProps {
    context: AppContext
}

export class Panel extends Component<PanelProps> {
  constructor(props: PanelProps) {
    super(props);
  }

  public render(): ReactNode {
    return (
      <div className='panel'>
          <ControlBar />
          { this.props.context.shouldDisplayDetailView() && <DetailView /> }

      </div>
    );
  }
}