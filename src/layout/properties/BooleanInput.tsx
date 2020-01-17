import React, { ReactNode, PureComponent } from 'react';
import './Properties.css';

export interface BooleanInputProps {
  name:           string;
  value:          boolean;
  outputCallback: (output: boolean) => void;
}

export class BooleanInput extends PureComponent<BooleanInputProps> {
  private previousInput: boolean;

  public constructor(props: BooleanInputProps) {
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
            checked   = { this.props.value }
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

  private handleValueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(typeof this.props.outputCallback === 'function') {
      this.props.outputCallback(event.currentTarget.checked);
    }
  }
}
