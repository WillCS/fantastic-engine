import React, { CSSProperties } from 'react';
import { Component, ReactNode } from 'react';
import './Tree.css';
import { TreeItemStyling } from './treeLayout';
import { TreeView } from './TreeView';

export interface TreeItemProps {
  root: TreeView;
  item: any;
  styling: TreeItemStyling;
  depth: number;
}

export interface TreeItemState {
  open: boolean;
}

export class TreeItem extends Component<TreeItemProps, TreeItemState> {
  public constructor(props: TreeItemProps) {
    super(props);
    this.state = {
      open: false
    };

    this.handleClicked = this.handleClicked.bind(this);
  }

  public render(): ReactNode {
    const hasChildren = this.props.children !== null 
        && (this.props.children as Array<any>).length > 0;

    return (
      <div className={this.getTreeItemClass()} >
        <div
          className={this.getLabelClass()}
          onClick={this.handleClicked}
        >
          <span 
            className='treeItemIndentedLabel'
            style={this.getDepthStyling()}
          >
            { hasChildren && <span className='treeItemArrow' /> }
            <span className='treeItemTitle'>
              {this.props.styling.name}
            </span>
          </span>
        </div>
          { this.state.open 
            && hasChildren 
            && <div className='treeItemDescendents'>
            {this.props.children}
          </div> }
      </div>
    );
  }

  private getTreeItemClass(): string {
    if(this.state.open) {
      return 'treeItem open';
    } else {
      return 'treeItem closed';
    }
  }

  private getLabelClass(): string {
    if(this.props.root.state.selected === this.props.item) {
      return 'treeItemLabel selected';
    } else {
      return 'treeItemLabel';
    }
  }

  private getDepthStyling(): CSSProperties {
    return {
      left: `${10 * this.props.depth}px`
    };
  }

  private handleClicked(event: React.MouseEvent<HTMLDivElement, MouseEvent>): any {
    this.setState({
      open: !this.state.open
    });

    this.props.root.setSelected(this.props.item);
  }
}
