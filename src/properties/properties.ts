export const PROPERTY_INDICATOR_SYMBOL: symbol = Symbol('Has properties');
export const PROPERTY_LIST_SYMBOL: symbol = Symbol('Properties');

export function hasProperties(targetConstructor: Function): void {
  Object.defineProperty(targetConstructor.prototype, PROPERTY_INDICATOR_SYMBOL, {
    value: true,
  });
}

export enum Readability {
  READONLY, EDITABLE
}

export enum PropertyType {
  STRING, INT, NUMBER, VEC2, VEC3, VEC2I, VEC3I, BOOLEAN, TEXTURE
}

export interface PropertyDescription {
  name:        string,
  key:         string,
  readability: Readability,
  type:        PropertyType
}

export function property(type: PropertyType, readability: Readability, name: string): (target: any, key: string | symbol) => void {
  return function (target: Object, key: string | symbol): void {
    if(typeof(key) === 'string') {
      Object.defineProperty(target, `__property.${key}`, {
        value: { name: name, key: key, readability: readability, type: type }
      });
    }
  }
}

export function getProperties(object: any): PropertyDescription[] {
  if(object && object[PROPERTY_INDICATOR_SYMBOL]) {
    const proto: any = Reflect.getPrototypeOf(object);
    const props: PropertyDescription[] = [];
    Object.getOwnPropertyNames(proto).forEach(propName => {
      if(propName.startsWith('__property')) {
        const prop = proto[propName];
        props.push(prop);
      }
    });

    return props;
  }

  return [];
}