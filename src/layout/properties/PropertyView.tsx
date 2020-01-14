import React from 'react';
import { Component, ReactNode } from 'react';
import { getProperties, PropertyType, PropertyDescription } from '../../properties/properties';
import './Properties.css';
import { StringInput } from './StringInput';
import { VectorInput } from './VectorInput';

export interface PropertyViewProps {
  item:            any | undefined;
  propertyChanged: () => void;
}

export class PropertyView extends Component<PropertyViewProps> {
  public render(): ReactNode {
    return getProperties(this.props.item).map((prop, index) =>
      <div 
        key       = {prop.key}
        className = 'propertyContainer'
      >
        <label>
          <span className = 'propertyName'>{ prop.name }</span>
          { this.getInputComponent(prop) }
        </label>
      </div>
    );
  }

  private getInputComponent(property: PropertyDescription): ReactNode {
    switch(property.type) {
      case PropertyType.STRING:
        return (
          <StringInput
            name           = {property.key}
            input          = {this.getItemPropertyValue(property)}
            outputCallback = {this.getOutputCallback(property)}
          />
        );
      case PropertyType.VEC2:
      case PropertyType.VEC3:
        return (
          <VectorInput
            name           = {property.key}
            integral       = {false}
            input          = {this.getItemPropertyValue(property)}
            outputCallback = {this.getOutputCallback(property)}
          />
        );
      case PropertyType.VEC2I:
      case PropertyType.VEC3I:
        return (
          <VectorInput
            name           = {property.key}
            integral       = {true}
            input          = {this.getItemPropertyValue(property)}
            outputCallback = {this.getOutputCallback(property)}
          />
        );
    }
  }

  private getItemPropertyValue(property: PropertyDescription): any {
    return this.props.item[property.key];
  }

  private getOutputCallback(property: PropertyDescription): (output: any) => void {
    const component = this;
    return function(output: any): void {
      component.props.item[property.key] = output;

      component.props.propertyChanged();
    }
  }
}
