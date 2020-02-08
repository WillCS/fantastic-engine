import React, { ReactNode, PureComponent } from 'react';
import './Properties.css';
import { observer } from 'mobx-react';

export interface BooleanInputProps {
  name:           string;
  value:          boolean;
  outputCallback: (output: boolean) => void;
}

@observer
export class BooleanInput extends PureComponent<BooleanInputProps> {
  public constructor(props: BooleanInputProps) {
    super(props);
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
