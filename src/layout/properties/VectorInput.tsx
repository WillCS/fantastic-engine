import React, { ReactNode, PureComponent, RefObject } from 'react';
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
  private inputRefs: RefObject<HTMLInputElement>[];

  public constructor(props: VectorInputProps) {
    super(props);

    this.inputRefs = [];
    for(let i = 0; i < this.getNumDimensions(); i++) {
      this.inputRefs.push(React.createRef());
    }
  }

  /**
   * This is required in order for undo/redo to visually take effect.
   * Because the input element only has a defaultValue specified, 
   * rerendering it doesn't change its actual value. The input
   * component works that way to allow it to be a pure component and
   * also to avoid having to keep track of some gross derived state.
   */
  public componentDidUpdate(prevProps: VectorInputProps): void {
    if(prevProps.value !== this.props.value && this.inputRefs.every(ref => ref.current)) {

      // I've literally never used case fallthrough before lmao
      switch(this.getNumDimensions()) {
        case 4:
          this.inputRefs[3].current!.value = `${(this.props.value as Vec4).w}`;
        case 3:
          this.inputRefs[2].current!.value = `${(this.props.value as Vec3).z}`;
        case 2:
          this.inputRefs[1].current!.value = `${this.props.value.y}`;
          this.inputRefs[0].current!.value = `${this.props.value.x}`;
      }
    }
  }

  public render(): ReactNode {
    return (
      <div className = 'inputContainer'>
        { MathHelper.range(this.getNumDimensions()).map(component =>
          <input
            ref          = { this.inputRefs[component] }
            className    = { this.getInputClassName() }
            key          = { component }
            type         = 'number'
            step         = { this.props.integral ? 1 : 0 }
            min          = { this.props.min }
            max          = { this.props.max }
            name         = { `this.props.name${component}` }
            defaultValue = { this.getValueOfVectorComponent(component) }
            onBlur       = { this.getBlurHandler(component) }
            onKeyPress   = { this.handleKeyPressed }
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

  private getBlurHandler(componentIndex: number): (event: React.FocusEvent<HTMLInputElement>) => void {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      if(!event.currentTarget.validity.valid) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      const newValue: Vec2 | Vec3 | Vec4 = this.props.value.copy();
      const parseFunc = this.props.integral ? parseInt : parseFloat;

      let changed = false;

      switch(componentIndex) {
        case 0:
          newValue.x           = parseFunc(event.currentTarget.value);
          changed = changed || (newValue.x !== this.props.value.x);
          break;
        case 1:
          newValue.y           = parseFunc(event.currentTarget.value);
          changed = changed || (newValue.y !== this.props.value.y);
          break;
        case 2:
          (newValue as Vec3).z = parseFunc(event.currentTarget.value);
          changed = changed || ((newValue as Vec3).z !== (this.props.value as Vec3).z);
          break;
        case 3:
          (newValue as Vec4).w = parseFunc(event.currentTarget.value);
          changed = changed || ((newValue as Vec4).w !== (this.props.value as Vec4).w);
          break;
      }

      if(changed) {
        if(typeof this.props.outputCallback === 'function') {
          this.props.outputCallback(newValue);
        }
      }
    }
  }

  private handleKeyPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.nativeEvent.key === 'Enter') {
      event.currentTarget.blur();
    }
  }
}
