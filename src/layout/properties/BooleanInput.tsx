import React from 'react';
import { Component, ReactNode } from 'react';
import './Properties.css';

export interface BooleanInputProps {
  name:           string;
  input:          boolean;
  outputCallback: (output: boolean) => void;
}

export interface BooleanInputState {
  value: boolean;
}

export class BooleanInput extends Component<BooleanInputProps, BooleanInputState> {
  private previousInput: boolean;

  public constructor(props: BooleanInputProps) {
    super(props);

    this.previousInput = this.props.input;
    
    this.state = {
      value: this.props.input
    };

    this.handleValueChanged = this.handleValueChanged.bind(this);
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
        <label>
          <input
            className = 'booleanInputProperty'
            type      = 'checkbox'
            name      = { this.props.name }
            checked   = { this.state.value }
            onChange  = { this.handleValueChanged }
          />
          <span className='booleanSwitch'>
            <span className='booleanSwitchInactive'>
              FALSE
            </span>
            <div className='booleanSwitchContainer'>
              <span className='booleanSwitchThumb'>
                <span className='booleanSwitchActive'>
                  TRUE
                </span>
              </span>
            </div>
          </span>
        </label>
      </div>
    );
  }

  private handleValueChanged(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      value: event.currentTarget.checked
    });

    this.props.outputCallback(event.currentTarget.checked);
  }
}
