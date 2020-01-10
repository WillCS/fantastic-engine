import React from 'react';
import { Component, ReactNode } from 'react';
import { TreeLayout } from './treeLayout';
import { TreeItem } from './TreeItem';
import './Tree.css';

export interface TreeViewProps {
  selectionChanged: (item: any) => void;
  root:             TreeLayout | undefined;
  selection:        any | undefined;
}

export class TreeView extends Component<TreeViewProps> {
  public constructor(props: TreeViewProps) {
    super(props);

    this.setSelection = this.setSelection.bind(this);
  }

  public render(): ReactNode {
    return (
      <div className='treeView'>
        { this.props.root !== undefined && 
          <TreeItem
            item         = {this.props.root}
            depth        = {0}
            rootItem     = {this.props.root}
            styling      = {this.props.root.decorate(this.props.root)}
            selection    = {this.props.selection}
            setSelection = {this.setSelection}
            childItems   = {this.props.root.populate(this.props.root)}
            openParent   = {() => {}}
          />
        }
      </div>
    );
  }

  public setSelection(item: any): void {
    this.props.selectionChanged(item);
  }
}
