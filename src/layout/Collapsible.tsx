import React from 'react';
import { Component, ReactNode } from 'react';
import './Layout.css';

export interface CollapsibleProps {
  title: string;
  open?: boolean
}

export interface CollapsibleState {
  open: boolean;
}

export class Collapsible extends Component<CollapsibleProps, CollapsibleState> {
  public constructor(props: CollapsibleProps) {
    super(props);
    this.state = { open: this.props.open || false };

    this.handleLabelClicked = this.handleLabelClicked.bind(this);
  }

  public render(): ReactNode {
    return (
      <div className={this.getContainerState()}>
        <div className='collapsibleLabel' onClick={this.handleLabelClicked}>
          <span className='collapsibleArrow' />
          <span className='collapsibleTitle'>
            {this.props.title}
          </span>
        </div>
        <div className='collapsibleContent'>
          {this.props.children}
        </div>
      </div>
    );
  }

  private getContainerState(): string {
    if(this.state.open) {
      return 'collapsibleContainer open';
    } else {
      return 'collapsibleContainer closed';
    }
  }

  private handleLabelClicked(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    this.setState({ open: !this.state.open })
  }
}
