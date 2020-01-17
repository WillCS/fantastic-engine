import React, { ReactNode, PureComponent } from 'react';
import './Properties.css';
import { Vec2, Vec3, Vec4 } from '../../math/vector';
import { MathHelper } from '../../math/mathHelper';

export interface VectorInputProps {
  name:           string;
  value:          Vec2 | Vec3 | Vec4;
  integral:       boolean;
  outputCallback: (output: Vec2 | Vec3 | Vec4) => void;
}

export class VectorInput extends PureComponent<VectorInputProps> {
  private previousInput: Vec2 | Vec3 | Vec4;

  public constructor(props: VectorInputProps) {
    super(props);

    this.previousInput = this.props.value;
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
    if(this.props.value !== this.previousInput) {
      this.previousInput = this.props.value;

      this.setState({
        value: this.props.value
      });
    }
  }

  public render(): ReactNode {
    return (
      <div className = 'inputContainer'>
        { MathHelper.range(this.getNumDimensions()).map(component =>
          <input
            className = { this.getInputClassName() }
            key       = { component }
            type      = 'number'
            step      = { this.props.integral ? 1 : 0.1 }
            name      = { `this.props.name${component}` }
            value     = { this.getValueOfVectorComponent(component) }
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
    const component = this;
    return function(event: React.ChangeEvent<HTMLInputElement>): void {
      const newValue: Vec2 | Vec3 | Vec4 = component.props.value.copy();
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

      component.props.outputCallback(newValue);
    }
  }
}
