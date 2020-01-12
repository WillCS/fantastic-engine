import React from 'react';
import { Component, ReactNode } from 'react';
import './Layout.css';
import { ControlButton, ControlButtonType } from '../layout/control/ControlButton';
import { AppIcon } from './icon/AppIcon';

export class ControlBar extends Component {
  public render(): ReactNode {
    return (
      <span className='controlBar'>
        <div className='controlBarTop'>
          <AppIcon />
          { this.props.children }
        </div>

        <div className='controlBarBottom'>
          <ControlButton
            type={ControlButtonType.GEAR}
            title='Settings'
            onClick={this.handleClick}
          />
        </div>
      </span>
    );
  }

  private handleClick(): void {
    
  }
}
