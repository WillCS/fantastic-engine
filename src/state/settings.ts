import { hasProperties, property, PropertyType, Readability } from "../properties/properties";
import React from 'react';
import { observable } from "mobx";

@hasProperties
export class Settings {
  private static readonly settingsKey: string = 'settings';

  @observable
  @property(PropertyType.SELECTION, Readability.EDITABLE, 'Angle Format', { allowedValues: { 'Degrees': true, 'Radians': false } })
  public useDegrees: boolean;

  @observable
  @property(PropertyType.INTERVAL, Readability.EDITABLE, 'Mouse Panning Sensitivity', { min: 1, max: 5, step: 1 })
  public mousePanSensitivity: number;

  @observable
  @property(PropertyType.INT, Readability.EDITABLE, 'Change History Max Size', { min: 0, max: 500 })
  public changeHistoryMaxSize: number;

  public constructor() {
    this.useDegrees          = true;
    this.mousePanSensitivity = 3;
    this.changeHistoryMaxSize = 100;
  }

  public save(): void {
    localStorage.setItem(Settings.settingsKey, JSON.stringify({
      useDegrees:           this.useDegrees,
      mousePanSensitivity:  this.mousePanSensitivity,
      changeHistoryMaxSize: this.changeHistoryMaxSize
    }));
  }

  public static createOrLoad(): Settings {
    const settings = new Settings();

    if(localStorage.hasOwnProperty(Settings.settingsKey)) {
      const store = JSON.parse(localStorage.getItem(Settings.settingsKey)!);
      
      settings.useDegrees           = store.useDegrees;
      settings.mousePanSensitivity  = store.mousePanSensitivity;
      settings.changeHistoryMaxSize = store.changeHistoryMaxSize;
    }

    return settings;
  }
}

export const SettingsContext: React.Context<Settings> = React.createContext(new Settings());
SettingsContext.displayName = 'MineventorSettings';
