import React, { ReactNode, PureComponent, RefObject } from 'react';
import './Properties.css';
import { observer } from 'mobx-react';

export interface StringInputProps {
  name:           string;
  value:          string;
  outputCallback: (output: string) => void;
}

@observer
export class StringInput extends PureComponent<StringInputProps> {
  private inputRef: RefObject<HTMLInputElement>;

  public constructor(props: StringInputProps) {
    super(props);

    this.inputRef = React.createRef();
  }
  
  /**
   * This is required in order for undo/redo to visually take effect.
   * Because the input element only has a defaultValue specified, 
   * rerendering it doesn't change its actual value. The input
   * component works that way to allow it to be a pure component and
   * also to avoid having to keep track of some gross derived state.
   */
  public componentDidUpdate(prevProps: StringInputProps): void {
    if(prevProps.value !== this.props.value && this.inputRef.current) {
      this.inputRef.current.value = this.props.value;
    }
  }

  public render(): ReactNode {
    return (
      <div className = 'inputContainer'>
        <input
          ref          = { this.inputRef }
          className    = 'stringInputProperty'
          type         = 'text'
          name         = { this.props.name }
          defaultValue = { this.props.value }
          onBlur       = { this.handleBlurred }
          onKeyPress   = { this.handleKeyPressed }
        />
      </div>
    );
  }

  private handleKeyPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.nativeEvent.key === 'Enter') {
      event.currentTarget.blur();
    }
  }

  private handleBlurred = (event: React.FocusEvent<HTMLInputElement>) => {
    if(this.props.value !== event.currentTarget.value) {
      if(typeof this.props.outputCallback === 'function') {
        this.props.outputCallback(event.currentTarget.value);
      }
    }
  }
}
