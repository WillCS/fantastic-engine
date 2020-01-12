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

export interface DetailVewState {
  expandedChildren:    number;
  childExpandedStates: boolean[];
}

export class DetailView extends Component<DetailViewProps, DetailVewState> {
  public constructor(props: DetailViewProps) {
    super(props);

    this.state = {
      expandedChildren:    0,
      childExpandedStates: [true, false, false]
    };

    this.handleChildOpened = this.handleChildOpened.bind(this);
    this.handleChildClosed = this.handleChildClosed.bind(this);
  }

  public render(): ReactNode {
    return (
      <span className={this.getClassName()}>
        <div className='detailView'>
          <Collapsible
            title     = 'COMPONENTS'
            index     = {0}
            startOpen = {this.state.childExpandedStates[0]}
            onOpen    = {this.handleChildOpened}
            onClose   = {this.handleChildClosed}
            resizable = {this.isChildResizable(0)}
          >
            <TreeView
              selection={this.props.selection}
              root={this.props.model}
              selectionChanged={this.props.setSelection}
            />
          </Collapsible>
          <Collapsible
            title     = 'PROPERTIES'
            index     = {1}
            startOpen = {this.state.childExpandedStates[1]}
            onOpen    = {this.handleChildOpened}
            onClose   = {this.handleChildClosed}
            resizable = {this.isChildResizable(1)}
          >
          </Collapsible>
          {/* <Collapsible
            title     = 'THIRD ONE LOL'
            index     = {2}
            startOpen = {this.state.childExpandedStates[2]}
            onOpen    = {this.handleChildOpened}
            onClose   = {this.handleChildClosed}
            resizable = {this.isChildResizable(2)}
          >
          </Collapsible> */}
        </div>
      </span>
    );
  }

  private getClassName(): string {
    return this.props.show
      ? 'detailContainer'
      : 'detailContainer hidden';
  }

  private handleChildOpened(collapsible: Collapsible): void {
    this.setState({
      expandedChildren:    this.state.expandedChildren + 1,
      childExpandedStates: this.state.childExpandedStates.map((v, i, a) => 
        i === collapsible.props.index
         ? true
         : v
        )
    });
  }

  private handleChildClosed(collapsible: Collapsible): void {
    this.setState({
      expandedChildren: this.state.expandedChildren - 1,
      childExpandedStates: this.state.childExpandedStates.map((v, i, a) => 
        i === collapsible.props.index
         ? false
         : v
        )
    });
  }

  private isChildResizable(index: number): boolean {
    if(this.state.expandedChildren === 0) {
      return false;
    } else if(index === this.state.childExpandedStates.length - 1) {
      return false;
    } else if(index === this.state.childExpandedStates.lastIndexOf(true)) {
      return false;
    }
    
    return this.state.childExpandedStates[index];
  }
}
