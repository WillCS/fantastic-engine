import React from 'react';
import { Component, ReactNode } from 'react';
import './Layout.css';
import { AppContext } from '../state/context';
import { TreeView } from './tree/TreeView';
import { Collapsible } from './Collapsible';

export interface DetailViewProps {
  context: AppContext;
}

export class DetailView extends Component<DetailViewProps> {
  public constructor(props: DetailViewProps) {
    super(props);
    this.setSelection = this.setSelection.bind(this);
  }

  public render(): ReactNode {
    return (
      <span className={this.getClassName()}>
        <div className='detailView'>
          <Collapsible
            title='COMPONENTS'
            open={true}
          >
            <TreeView 
              context={this.props.context} 
              root={this.props.context.getModel()}
              selectionChanged={this.setSelection}
            />
          </Collapsible>
          <Collapsible
            title='PROPERTIES'
            open={false}
          >
          </Collapsible>
        </div>
      </span>
    );
  }

  private getClassName(): string {
    if(this.props.context.shouldDisplayDetailView()) {
      return 'detailContainer';
    } else {
      return 'detailContainer hidden';
    }
  }

  private setSelection(selection: any): void {
    if(this.props.context.hasModel()) {
      this.props.context.getModelController()!.setSelection(selection);
    }
  }
}
