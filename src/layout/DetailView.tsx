import React from 'react';
import { Component, ReactNode } from 'react';
import './Layout.css';
import { AppContext } from '../state/context';

export interface DetailViewProps {
  context: AppContext
}

export class DetailView extends Component<DetailViewProps> {
  constructor(props: DetailViewProps) {
    super(props);
  }

  public render(): ReactNode {
    return (
      <span className={this.getClassName()}>

      </span>
    );
  }

  private getClassName(): string {
    if(this.props.context.shouldDisplayDetailView()) {
      return 'detailView';
    } else {
      return 'detailView hidden';
    }
  }
}