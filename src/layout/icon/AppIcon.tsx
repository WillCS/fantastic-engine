import React from 'react';
import { Component, ReactNode } from 'react';
import './AppIcon.css';
import logo from '../../logo.svg';

export class AppIcon extends Component {
  public render(): ReactNode {
    return (
      <span className='appIcon'>
        <img src={logo} className='appIconImg' alt='logo' title='Mineventor' />
      </span>
    );
  }
}
