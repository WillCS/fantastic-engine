import React from 'react';
import { Component, ReactNode } from 'react';
import './Layout.css';
import { ContextController } from '../state/contextController';
import { AppContext } from '../state/context';
import { ControlButton, ControlButtonType } from '../control/ControlButton';
import { AppIcon } from './icon/AppIcon';

export interface ControlBarProps {
  context: AppContext,
  contextController: ContextController
}

export class ControlBar extends Component<ControlBarProps> {
  constructor(props: ControlBarProps) {
    super(props);
  }

  public render(): ReactNode {
    return (
      <span className='controlBar'>
        <div className='controlBarTop'>
          <AppIcon />
          { this.props.context.populateControlBar(this.props.contextController) }
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
    console.log('ree');
  }
}