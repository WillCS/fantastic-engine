import React from 'react';
import { Component, ReactNode } from 'react';
import './Layout.css';
import { TreeView } from './tree/TreeView';
import { Collapsible } from './Collapsible';
import { Model } from '../model/model';

export interface DetailViewProps {
  show:         boolean;
  model:        Model | undefined;
  updateModel:  (updatedModel: Model) => void;
  selection:    any | undefined;
  setSelection: (newSelection: any) => void;
}

export class DetailView extends Component<DetailViewProps> {
  public render(): ReactNode {
    return (
      <span className={this.getClassName()}>
        <div className='detailView'>
          <Collapsible
            title='COMPONENTS'
            open={true}
          >
            <TreeView
              selection={this.props.selection}
              root={this.props.model}
              selectionChanged={this.props.setSelection}
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
    return this.props.show
      ? 'detailContainer'
      : 'detailContainer hidden';
  }
}
