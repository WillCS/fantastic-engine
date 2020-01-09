import React from 'react';
import { Component, ReactNode } from 'react';
import './Layout.css';
import { AppContext } from '../state/context';
import { TreeView } from './tree/TreeView';
import { Collapsible } from './Collapsible';

export interface DetailViewProps {
  context: AppContext;
}

export interface DetailViewState {
  selection: any | undefined;
}

export class DetailView extends Component<DetailViewProps, DetailViewState> {
  public constructor(props: DetailViewProps) {
    super(props);

    this.state = {
      selection: undefined
    };

    this.handleInternalSelectionChange = this.handleInternalSelectionChange.bind(this);
    this.handleExternalSelectionChange = this.handleExternalSelectionChange.bind(this);
  }

  public componentDidUpdate(): void {
    if(this.props.context.hasModel()) {
      this.props.context.getModelController()!
        .registerSelectionChangeListener(this.handleExternalSelectionChange);
    }
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
              selection={this.getSelection()}
              root={this.props.context.getModel()}
              selectionChanged={this.handleInternalSelectionChange}
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

  private handleInternalSelectionChange(newSelection: any): void {
    this.props.context.getModelController()!.setSelection(newSelection);
  }

  private handleExternalSelectionChange(newSelection: any): void {
    this.setState({
      selection: newSelection
    });
  }

  private getSelection(): any | undefined {
    return this.state.selection;
  }
}
