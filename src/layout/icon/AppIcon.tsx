import React from 'react';
import { Component, ReactNode } from 'react';
import './AppIcon.css';
import { MathHelper } from '../../math/mathHelper';

export class AppIcon extends Component {
  public render(): ReactNode {
    return (
      <span className='appIcon'>
        <span className='top'></span>
          { MathHelper.range(5).map(id => 
            <span className='side' key={id} />
          )}
      </span>
    );
  }
}