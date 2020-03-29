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

export interface VectorInputState {
  value: Vec2 | Vec3 | Vec4;
}

@observer
export class VectorInput extends PureComponent<VectorInputProps, VectorInputState> {
  public constructor(props: VectorInputProps) {
    super(props);

    this.state = {
      value: this.props.value
    };
  }

  public render(): ReactNode {
    return (
      <div className = 'inputContainer'>
        { MathHelper.range(this.getNumDimensions()).map(component =>
          <input
            className = { this.getInputClassName() }
            key       = { component }
            type      = 'number'
            step      = { this.props.integral ? 1 : 0.001 }
            min       = { this.props.min }
            max       = { this.props.max }
            name      = { `this.props.name${component}` }
            value     = { this.getValueOfVectorComponent(component) }
            onBlur    = { this.handleBlurred }
            onChange  = { this.getValueHandler(component) }
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
        val = this.state.value.x;
        break;
      case 1: 
        val = this.state.value.y;
        break;
      case 2: 
        val = (this.state.value as Vec3).z;
        break;
      case 3: 
        val = (this.state.value as Vec4).w;
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

      this.setState({
        value: newValue
      });
    }
  }

  private handleBlurred = (event: React.FocusEvent<HTMLInputElement>) => {
    if(typeof this.props.outputCallback === 'function') {
      this.props.outputCallback(this.state.value);
    }
  }
}
