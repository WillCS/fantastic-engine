import React from 'react';
import { Component, ReactNode } from 'react';
import './Layout.css';

export interface DetailViewProps {

}

export class DetailView extends Component<DetailViewProps> {
  constructor(props: DetailViewProps) {
    super(props);
  }

  public render(): ReactNode {
    return (
      <span className='detailView'>

      </span>
    );
  }
}