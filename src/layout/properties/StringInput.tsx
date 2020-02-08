import React, { ReactNode, PureComponent } from 'react';
import './Properties.css';

export interface StringInputProps {
  name:           string;
  value:          string;
  outputCallback: (output: string) => void;
}

export class StringInput extends PureComponent<StringInputProps> {
  public constructor(props: StringInputProps) {
    super(props);
  }

  public render(): ReactNode {
    return (
      <div className = 'inputContainer'>
        <input
          className = 'stringInputProperty'
          type      = 'text'
          name      = { this.props.name }
          value     = { this.props.value }
          onChange  = { this.handleValueChanged }
        />
      </div>
    );
  }

  private handleValueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(typeof this.props.outputCallback === 'function') {
      this.props.outputCallback(event.currentTarget.value);
    }
  }
}
