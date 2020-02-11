import React, { ReactNode } from 'react';
import './Modal.css';

export interface ModalProps {
  visible: boolean;
  header: string;
  closeModal: () => void;
}

export class Modal extends React.Component<ModalProps> {
  public constructor(props: ModalProps) {
    super(props);
  }

  public render(): ReactNode {
    return (
      <div className = {this.getContainerClass()}>
        <div className = 'modalShade'>
          <div className = 'modalBox'>
            <span className = 'modalHeader'>
              <p>{ this.props.header }</p>
              <button className = 'closeButton'
                title   = 'Close Settings'
                onClick = {this.props.closeModal}
              >
                <span></span>
                <span></span>
              </button>
            </span>
            { this.props.children }
          </div>
        </div>
      </div>
    )
  }

  private getContainerClass(): string {
    return this.props.visible 
      ? 'modalContainer visible'
      : 'modalContainer';
  }
}
