import React from 'react';
import { Component, ReactNode } from 'react';
import './AppIcon.css';
import logo from '../../logo.svg';
import { MathHelper } from '../../math/mathHelper';

export class AppIcon extends Component {
  public render(): ReactNode {
    return (
      <span className='appIcon'>
        <img src={logo} className='appIconImg' alt='logo' title='Mineventor' />
      </span>
    );
  }
}
