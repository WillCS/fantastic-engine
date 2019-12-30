import React from 'react';
import { Component, ReactNode } from 'react';
import './Layout.css';
import { GearButton } from '../control/GearButton';

export interface ControlBarProps {

}

export class ControlBar extends Component<ControlBarProps> {
  constructor(props: ControlBarProps) {
    super(props);
  }

  public render(): ReactNode {
    return (
      <span className='controlBar'>
        <div className='controlBarTop'>
        </div>
        
        <div className='controlBarBottom'>
          <GearButton teeth={8} />
        </div>
      </span>
    );
  }
}