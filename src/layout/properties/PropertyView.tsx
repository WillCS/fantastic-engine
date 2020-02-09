import React from 'react';
import { Component, ReactNode } from 'react';
import { getProperties, PropertyType, PropertyDescription } from '../../properties/properties';
import './Properties.css';
import { StringInput } from './StringInput';
import { VectorInput } from './VectorInput';
import { BooleanInput } from './BooleanInput';
import { observer } from 'mobx-react';

export interface PropertyViewProps {
  item: any | undefined;
}

@observer
export class PropertyView extends Component<PropertyViewProps> {
  public render(): ReactNode {
    return (
      <table className='propertyTable'>
        <tbody>
          { getProperties(this.props.item).map((prop, index) =>
            <tr 
              key       = {prop.key}
              className = 'propertyRow'
            >
              <td className = 'propertyNameCol'>
                <span className = 'propertyName'>
                  { prop.name }
                </span>
              </td>
              <td className = 'propertyInputCol'>
                { this.getInputComponent(prop) }
              </td>
            </tr>
          ) }
        </tbody>
      </table>
    );
  }

  private getInputComponent(property: PropertyDescription): ReactNode {
    switch(property.type) {
      case PropertyType.STRING:
        return (
          <StringInput
            name           = {property.key}
            value          = {this.getItemPropertyValue(property)}
            outputCallback = {this.getOutputCallback(property)}
          />
        );
      case PropertyType.VEC2:
      case PropertyType.VEC3:
        return (
          <VectorInput
            name           = {property.key}
            integral       = {false}
            min            = {property.constraints.min}
            max            = {property.constraints.max}
            value          = {this.getItemPropertyValue(property)}
            outputCallback = {this.getOutputCallback(property)}
          />
        );
      case PropertyType.VEC2I:
      case PropertyType.VEC3I:
        return (
          <VectorInput
            name           = {property.key}
            integral       = {true}
            min            = {property.constraints.min}
            max            = {property.constraints.max}
            value          = {this.getItemPropertyValue(property)}
            outputCallback = {this.getOutputCallback(property)}
          />
        );
      case PropertyType.BOOLEAN:
        return (
          <BooleanInput
            name           = {property.key}
            value          = {this.getItemPropertyValue(property)}
            outputCallback = {this.getOutputCallback(property)}
          />
        )
    }
  }

  private getItemPropertyValue(property: PropertyDescription): any {
    return this.props.item[property.key];
  }

  private getOutputCallback(property: PropertyDescription): (output: any) => void {
    const component = this;
    return function(output: any): void {
      component.props.item[property.key] = output;
    }
  }
}
