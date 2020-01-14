import React from 'react';
import { Component, ReactNode } from 'react';
import './Properties.css';

export interface StringInputProps {
  name:           string;
  input:          string;
  outputCallback: (output: string) => void;
}

export interface StringInputState {
  value: string;
}

export class StringInput extends Component<StringInputProps, StringInputState> {
  private previousInput: string;

  public constructor(props: StringInputProps) {
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
        <input
          className = 'stringInputProperty'
          type      = 'text'
          name      = { this.props.name }
          value     = { this.state.value }
          onChange  = { this.handleValueChanged }
        />
      </div>
    );
  }

  private handleValueChanged(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      value: event.currentTarget.value
    });

    this.props.outputCallback(event.currentTarget.value);
  }
}
