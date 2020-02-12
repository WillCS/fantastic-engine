import React, { ReactNode, PureComponent } from 'react';
import './Properties.css';
import { observer } from 'mobx-react';

export interface SelectionInputProps {
  name:           string;
  value:          any;
  outputCallback: (output: any) => void;
  allowedValues?: {};
}

@observer
export class SelectionInput extends PureComponent<SelectionInputProps> {
  public constructor(props: SelectionInputProps) {
    super(props);

    if(!this.props.allowedValues) {
      throw new Error('Selection Input instantiated for property with no allowed values.');
    }
  }

  public render(): ReactNode {
    return (
      <div className = 'inputContainer'>
        { Object.keys(this.props.allowedValues!).map(valueName => (
          <label 
            className = { this.getLabelClassName(valueName) }
            key       = { valueName }
          >
            { valueName }
            <input 
              className = {'selectionInputProperty'}
              type      = 'radio'
              name      = { this.props.name }
              value     = { (this.props.allowedValues! as any)[valueName] }
              onChange  = { this.handleValueChanged }
            />
          </label>
        )) }
      </div>
    );
  }

  private handleValueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(typeof this.props.outputCallback === 'function') {
      this.props.outputCallback(event.currentTarget.value === 'true');
    }
  }

  private getLabelClassName(valueName: string) {
    return (this.props.allowedValues! as any)[valueName] === this.props.value
      ? 'selectionLabel selected'
      : 'selectionLabel';
  }
}
