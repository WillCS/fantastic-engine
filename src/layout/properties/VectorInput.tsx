import React, { ReactNode, PureComponent } from 'react';
import './Properties.css';
import { Vec2, Vec3, Vec4 } from '../../math/vector';
import { MathHelper } from '../../math/mathHelper';
import { observer } from 'mobx-react';

export interface VectorInputProps {
  name:           string;
  value:          Vec2 | Vec3 | Vec4;
  integral?:      boolean;
  min?:           number;
  max?:           number;
  outputCallback: (output: Vec2 | Vec3 | Vec4) => void;
}

@observer
export class VectorInput extends PureComponent<VectorInputProps> {
  public constructor(props: VectorInputProps) {
    super(props);
  }

  public render(): ReactNode {
    return (
      <div className = 'inputContainer'>
        { MathHelper.range(this.getNumDimensions()).map(component =>
          <input
            className = {this.getInputClassName()}
            key       = {component}
            type      = 'number'
            step      = {this.props.integral ? 1 : 0.001}
            min       = {this.props.min}
            max       = {this.props.max}
            name      = {`this.props.name${component}`}
            value     = {this.getValueOfVectorComponent(component)}
            onChange  = {this.getValueHandler(component)}
          />
        )}
      </div>
    );
  }

  private getNumDimensions(): number {
    if(this.props.value instanceof Vec2) {
      return 2;
    } else if(this.props.value instanceof Vec3) {
      return 3;
    } else if(this.props.value instanceof Vec4) {
      return 4;
    } else {
      return NaN;
    }
  }

  private getValueOfVectorComponent(componentIndex: number): number | string {
    let val: number;
    switch(componentIndex) {
      case 0:
        val = this.props.value.x;
        break;
      case 1: 
        val = this.props.value.y;
        break;
      case 2: 
        val = (this.props.value as Vec3).z;
        break;
      case 3: 
        val = (this.props.value as Vec4).w;
        break;
      default: 
        val = NaN;
        break;
    }

    return isNaN(val)
      ? ''
      : val;
  }

  private getInputClassName(): string {
      return `vec${this.getNumDimensions()}InputProperty`;
  }

  private getValueHandler(componentIndex: number): (event: React.ChangeEvent<HTMLInputElement>) => void {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      if(!event.currentTarget.validity.valid) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      const newValue: Vec2 | Vec3 | Vec4 = this.props.value.copy();
      const parseFunc = this.props.integral ? parseInt : parseFloat;

      switch(componentIndex) {
        case 0:
          newValue.x           = parseFunc(event.currentTarget.value);
          break;
        case 1:
          newValue.y           = parseFunc(event.currentTarget.value);
          break;
        case 2:
          (newValue as Vec3).z = parseFunc(event.currentTarget.value);
          break;
        case 3:
          (newValue as Vec4).w = parseFunc(event.currentTarget.value);
          break;
      }

      this.props.outputCallback(newValue);
    }
  }
}
