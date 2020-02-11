import React, { Component, ReactNode, CSSProperties, RefObject } from 'react';
import './Layout.css';

export interface CollapsibleProps {
  title:      string;
  index:      number;
  startOpen?: boolean;
  onOpen?:    (collapsible: Collapsible) => void;
  onClose?:   (collapsible: Collapsible) => void;
  resizable?: boolean;
}

export interface CollapsibleState {
  open:         boolean;
  customHeight: number;
}

export class Collapsible extends Component<CollapsibleProps, CollapsibleState> {
  private contentRef: RefObject<HTMLDivElement>;
  
  public constructor(props: CollapsibleProps) {
    super(props);

    this.state = { 
      open:         this.props.startOpen || false,
      customHeight: 250
    };

    this.contentRef = React.createRef();

    if(this.state.open && this.props.onOpen) {
      this.props.onOpen(this);
    }

    this.handleLabelClicked = this.handleLabelClicked.bind(this);
    this.beginResizing      = this.beginResizing.bind(this);
    this.resize             = this.resize.bind(this);
    this.endResizing        = this.endResizing.bind(this);
  }

  public render(): ReactNode {
    return (
      <div className={this.getContainerState()}>
        <div className='collapsibleLabel' onClick={this.handleLabelClicked}>
          <span className='collapsibleArrow' />
          <span className='collapsibleTitle'>
            { this.props.title }
          </span>
        </div>
        <div
          className = 'collapsibleContent'
          style     = {this.getAdditionalContentStyling()}
          ref       = {this.contentRef}
        >
          { this.props.children }
        </div>
        { this.state.open && this.props.resizable && 
          <div
            className    = 'collapsibleResizeBar'
            onMouseDown  = {this.beginResizing}
          >
          </div>
        }
      </div>
    );
  }

  private getContainerState(): string {
    let baseClass = 'collapsibleContainer';

    baseClass += this.state.open
      ? ' open'
      : ' closed';

    baseClass += (this.state.open && this.props.resizable)
      ? ' elastic'
      : ' fixed';

    return baseClass;
  }

  private handleLabelClicked(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    if(!this.state.open && this.props.onOpen) {
      this.props.onOpen(this);
    } else if(this.state.open && this.props.onClose) {
      this.props.onClose(this);
    }

    this.setState({ 
      open:         !this.state.open,
      customHeight: this.state.customHeight
    });
  }

  private beginResizing(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    document.addEventListener('mouseup',   this.endResizing, { capture: true });
    document.addEventListener('mousemove', this.resize,      { capture: true });
    event.preventDefault();
    event.stopPropagation();

  }

  private resize(event: MouseEvent): void {
    if(this.contentRef!.current) {
      const contentHeight  = this.contentRef.current.clientHeight;
      const mouseYMovement = event.movementY;

      const newHeight = contentHeight + mouseYMovement;

      this.setCustomHeight(newHeight);
    }
  }

  private endResizing(event: MouseEvent): any {
    document.removeEventListener('mouseup',   this.endResizing, { capture: true });
    document.removeEventListener('mousemove', this.resize,      { capture: true });
    event.stopPropagation();
  }

  private setCustomHeight(height: number): void {
    this.setState({
      open:         this.state.open,
      customHeight: height
    });
  }

  private getAdditionalContentStyling(): CSSProperties {
    const height = this.state.open
      ? (this.props.resizable
        ? (this.state.customHeight < 50
          ? '50px'
          : `${this.state.customHeight}px`)
        : 'auto')
      : '0px';

    return {
      height: height
    };
  }
}
