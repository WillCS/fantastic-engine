import React from 'react';
import { Component, ReactNode } from 'react';
import './Layout.css';
import { TreeView } from './tree/TreeView';
import { Collapsible } from './Collapsible';
import { PropertyView } from './properties/PropertyView';
import { observer } from 'mobx-react';
import { AppContext } from '../state/context';
import { EditorContext } from '../state/editorContext';
import { TextureView } from './TextureView';

export interface DetailViewProps {
  show:    boolean;
  context: AppContext
}

export interface DetailVewState {
  expandedChildren:    number;
  childExpandedStates: boolean[];
}

@observer
export class DetailView extends Component<DetailViewProps, DetailVewState> {
  public constructor(props: DetailViewProps) {
    super(props);

    this.state = {
      expandedChildren:    0,
      childExpandedStates: [true, true, false]
    };
  }

  public render(): ReactNode {
    return (
      <span className = {this.getClassName()}>
        { this.props.context instanceof EditorContext &&
          <div className = 'detailView'>
            <Collapsible
              title     = 'COMPONENTS'
              index     = {0}
              startOpen = {this.state.childExpandedStates[0]}
              onOpen    = {this.handleChildOpened}
              onClose   = {this.handleChildClosed}
              resizable = {this.isChildResizable(0)}
            >
              <TreeView
                selection        = {this.getContext().selection}
                root             = {this.getContext().model}
                selectionChanged = {this.handleSelectionChanged}
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
              <PropertyView
                item         = {this.getContext().selection}
                context      = {this.props.context}
              />
            </Collapsible>
            <Collapsible
              title     = 'TEXTURE'
              index     = {2}
              startOpen = {this.state.childExpandedStates[2]}
              onOpen    = {this.handleChildOpened}
              onClose   = {this.handleChildClosed}
              resizable = {this.isChildResizable(2)}
            >
              <TextureView
                context = {this.props.context}
              />
            </Collapsible>
          </div>
        }
      </span>
    );
  }

  private getClassName(): string {
    return this.props.show
      ? 'detailContainer'
      : 'detailContainer hidden';
  }

  private handleChildOpened = (collapsible: Collapsible) => {
    this.setState({
      expandedChildren:    this.state.expandedChildren + 1,
      childExpandedStates: this.state.childExpandedStates.map(
        (v, i, a) => i === collapsible.props.index
          ? true
          : v
      )});
  }

  private handleChildClosed = (collapsible: Collapsible) => {
    this.setState({
      expandedChildren: this.state.expandedChildren - 1,
      childExpandedStates: this.state.childExpandedStates.map(
        (v, i, a) => i === collapsible.props.index
          ? false
          : v
      )});
  }

  private handleSelectionChanged = (newSelection: any) => {
    this.getContext().selection = newSelection;
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

  private getContext(): EditorContext {
    return this.props.context as EditorContext;
  }
}
