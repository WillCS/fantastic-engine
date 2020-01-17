import React, { ReactNode, PureComponent } from 'react';
import './Properties.css';

export interface StringInputProps {
  name:           string;
  value:          string;
  outputCallback: (output: string) => void;
}

export class StringInput extends PureComponent<StringInputProps> {
  private previousInput: string;

  public constructor(props: StringInputProps) {
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
