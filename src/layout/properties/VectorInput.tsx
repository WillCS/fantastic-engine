import React from 'react';
import { Component, ReactNode } from 'react';
import './Properties.css';
import { Vec2, Vec3, Vec4 } from '../../math/vector';
import { MathHelper } from '../../math/mathHelper';

export interface VectorInputProps {
  name:           string;
  input:          Vec2 | Vec3 | Vec4;
  integral:       boolean;
  outputCallback: (output: Vec2 | Vec3 | Vec4) => void;
}

export interface VectorInputState {
  value: Vec2 | Vec3 | Vec4;
}

export class VectorInput extends Component<VectorInputProps, VectorInputState> {
  private previousInput: Vec2 | Vec3 | Vec4;

  public constructor(props: VectorInputProps) {
    super(props);

    this.previousInput = this.props.input;
    
    this.state = {
      value: this.props.input
    };
  }

  /**
   *  When the selected object changes, and the parent PropertyView replaces
   *  this component with a different one, if the new component is of the same
   *  type as this one, all it really does is change the props passed to this
   *  component. Without intervention, this leads to the value of the input tag
   *  persisting across selection changes. The check and state update in
   *  componentDidUpdate are there in order to update the value of the input tag
   *  whenever this happens. */
  public componentDidUpdate(): void {
    if(this.props.input !== this.previousInput) {
      this.previousInput = this.props.input;

      this.setState({
        value: this.props.input
      });
    }
  }

  public render(): ReactNode {
    return (
      <div className = 'inputContainer'>
        { MathHelper.range(this.getNumDimensions()).map(component =>
          <input
            className = { this.getInputClassName() }
            type      = 'number'
            step      = { this.props.integral ? '1' : undefined }
            name      = { `this.props.name${component}` }
            value     = { this.getValueOfVectorComponent(component) }
            onChange  = { this.getValueHandler(component) }
          />
        )}
      </div>
    );
  }

  private getNumDimensions(): number {
    if(this.props.input instanceof Vec2) {
      return 2;
    } else if(this.props.input instanceof Vec3) {
      return 3;
    } else if(this.props.input instanceof Vec4) {
      return 4;
    } else {
      return NaN;
    }
  }

  private getValueOfVectorComponent(componentIndex: number): number {
    switch(componentIndex) {
      case 0:  return this.state.value.x;
      case 1:  return this.state.value.y;
      case 2:  return (this.state.value as Vec3).z;
      case 3:  return (this.state.value as Vec4).w;
      default: return NaN;
    }
  }

  private getInputClassName(): string {
      return `vec${this.getNumDimensions()}InputProperty`;
  }

  private getValueHandler(componentIndex: number): (event: React.ChangeEvent<HTMLInputElement>) => void {
    const component = this;
    return function(event: React.ChangeEvent<HTMLInputElement>): void {
      const newValue: Vec2 | Vec3 | Vec4 = component.state.value.copy();
      const parseFunc = component.props.integral ? parseInt : parseFloat;

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

      component.setState({
        value: newValue
      });

      component.props.outputCallback(newValue);
    }
  }
}
