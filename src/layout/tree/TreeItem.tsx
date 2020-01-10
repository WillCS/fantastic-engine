import React, { CSSProperties } from 'react';
import { Component, ReactNode } from 'react';
import { TreeItemStyling, TreeLayout } from './treeLayout';
import './Tree.css';

export interface TreeItemProps {
  item:         any;
  styling:      TreeItemStyling;
  depth:        number;
  rootItem:     TreeLayout;
  selection:    any | undefined;
  setSelection: (selection: any | undefined) => void;
  openParent:   () => void;
  childItems:   any[];
}

export interface TreeItemState {
  open: boolean;
}

export class TreeItem extends Component<TreeItemProps, TreeItemState> {
  private lastSelection: any | undefined;
  public constructor(props: TreeItemProps) {
    super(props);
    this.state = {
      open: false
    };

    this.lastSelection = undefined;

    this.handleClicked = this.handleClicked.bind(this);
    this.cascadeOpen   = this.cascadeOpen.bind(this);
  }

  public componentDidMount(): void {
    this.props.openParent();
  }

  public componentDidUpdate(): boolean {
    let found = false;

    if(this.lastSelection !== this.props.selection) {
      found = this.props.selection === this.props.item;

      this.lastSelection = this.props.selection;
    }

    if(found) {
      this.cascadeOpen();
    }

    return found;
  }

  private cascadeOpen(): void {
    this.props.openParent();
    this.setState({
      open: true
    });
  }
  
  public render(): ReactNode {
    const hasChildren = this.props.childItems.length > 0;

    return (
      <div className = {this.getTreeItemClass()} >
        <div
          className = {this.getLabelClass()}
          onClick   = {this.handleClicked}
        >
          <span 
            className = 'treeItemIndentedLabel'
            style     = {this.getDepthStyling()}
          >
            { hasChildren && <span className = 'treeItemArrow' /> }
            <span className = 'treeItemTitle'>
              { this.props.styling.name }
            </span>
          </span>
        </div>
        <div className = 'treeItemDescendents'>
          { hasChildren && this.props.childItems.map((child, index) => {
            return <TreeItem
              key          = {index}
              item         = {child}
              depth        = {this.props.depth + 1}
              rootItem     = {this.props.rootItem}
              styling      = {this.props.rootItem.decorate(child)}
              selection    = {this.props.selection}
              setSelection = {this.props.setSelection}
              childItems   = {this.props.rootItem.populate(child)}
              openParent   = {this.cascadeOpen}
            />
          })}
        </div> 
      </div>
    );
  }

  private getTreeItemClass(): string {
    return this.state.open
      ? 'treeItem open'
      : 'treeItem closed';
  }

  private getLabelClass(): string {
    return this.props.selection === this.props.item
      ? 'treeItemLabel selected'
      : 'treeItemLabel';
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

    this.props.setSelection(this.props.item);
  }
}
