import React from 'react';
import { Component, ReactNode } from 'react';
import { AppContext } from '../../state/context';
import { TreeLayout } from './treeLayout';
import { TreeItem } from './TreeItem';
import './Tree.css';

export interface TreeViewProps {
  selectionChanged: (item: any) => void;
  context:          AppContext;
  root:             TreeLayout | undefined;
}

export interface TreeViewState {
  selected: any | undefined;
}

export class TreeView extends Component<TreeViewProps, TreeViewState> {
  public constructor(props: TreeViewProps) {
    super(props);
    this.state = {
      selected: undefined
    };
  }

  public render(): ReactNode {
    return (
      <div className='treeView'>
        { this.buildTree(this.props.root) }
      </div>
    );
  }

  public setSelected(item: any): void {
    this.setState({
      selected: item
    });

    this.props.selectionChanged(item);
  }

  private buildTree(root: TreeLayout | undefined): ReactNode {
    if(!root) {
      return <span></span>
    } else {
      return this.buildSubTree(root, root, 0, { key: 0 });
    }
  }

  private buildSubTree(root: TreeLayout, item: any, depth: number, index: { key: number }): ReactNode {
    const children = root.populate(item);

    return (
      <TreeItem
        key={index.key++}
        root={this}
        item={item}
        depth={depth++}
        styling={root.decorate(item)}
      >
        { children instanceof Array && children.map(child => {
          return this.buildSubTree(root, child, depth, index);
        })}
      </TreeItem>
    )
  }
}
