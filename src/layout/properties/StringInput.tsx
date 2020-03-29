import React, { ReactNode, PureComponent } from 'react';
import './Properties.css';
import { observer } from 'mobx-react';

export interface StringInputProps {
  name:           string;
  value:          string;
  outputCallback: (output: string) => void;
}

export interface StringInputState {
  value: string;
}

@observer
export class StringInput extends PureComponent<StringInputProps, StringInputState> {
  public constructor(props: StringInputProps) {
    super(props);

    this.state = {
      value: this.props.value
    };
  }

  public render(): ReactNode {
    return (
      <div className = 'inputContainer'>
        <input
          className  = 'stringInputProperty'
          type       = 'text'
          name       = { this.props.name }
          value      = { this.state.value }
          onBlur     = { this.handleBlurred }
          onChange   = { this.handleValueChanged }
          onKeyPress = { this.handleKeyPressed }
        />
      </div>
    );
  }

  private handleKeyPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.nativeEvent.key === 'Enter') {
      event.currentTarget.blur();
    }
  }

  private handleValueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: event.currentTarget.value
    });
  }

  private handleBlurred = (event: React.FocusEvent<HTMLInputElement>) => {
    if(this.props.value !== this.state.value) {
      if(typeof this.props.outputCallback === 'function') {
        this.props.outputCallback(this.state.value);
      }
    }
  }
}
