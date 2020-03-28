import React from 'react';
import { Component, ReactNode } from 'react';
import { TreeItem } from './TreeItem';
import './Tree.css';
import { observer } from 'mobx-react';
import { TreeViewItem } from './tree';
import { Selectable } from '../../state/selection';

export interface TreeViewProps {
  selectionChanged: (item: any) => void;
  root:             TreeViewItem;
  selection?:       Selectable;
}

@observer
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
            styling      = {this.props.root.decorate()}
            selection    = {this.props.selection}
            setSelection = {this.setSelection}
            childItems   = {this.props.root.populate()}
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
