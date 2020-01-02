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
  public render(): ReactNode {
    return (
      <span className={this.getClassName()}>
        <Collapsible
          title='COMPONENTS'
          open={true}
        >
          <TreeView 
            context={this.props.context} 
            root={this.props.context.getModel()}
            selectionChanged={
              this.props.context.getModelController()?.setSelection!
            }
          />
        </Collapsible>
        <Collapsible
          title='PROPERTIES'
          open={false}
        >

        </Collapsible>
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
