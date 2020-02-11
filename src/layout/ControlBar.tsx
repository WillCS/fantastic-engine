import React from 'react';
import { Component, ReactNode } from 'react';
import './Layout.css';
import { ControlButton, ControlButtonType } from '../layout/control/ControlButton';
import { AppIcon } from './icon/AppIcon';
import { AppContext } from '../state/context';

export interface ControlBarProps {
  context: AppContext;
}

export class ControlBar extends Component<ControlBarProps> {
  public constructor(props: ControlBarProps) {
    super(props);
  }

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
            onClick={this.handleSettingsClick}
          />
        </div>
      </span>
    );
  }

  private handleSettingsClick = () => {
    this.props.context.settingsOpen = true;
  }
}
