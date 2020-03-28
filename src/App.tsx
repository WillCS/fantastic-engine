import React from 'react';
import { Component, ReactNode } from 'react';
import './App.css';
import { Viewport } from './layout/Viewport';
import { DetailView } from './layout/DetailView';
import { ControlBar } from './layout/ControlBar';
import { RenderManager } from './graphics/renderManager';
import { ControlButton, ControlButtonDescriptor } from './layout/control/ControlButton';
import { EditorContext } from './state/editorContext';
import { ContextStore } from './state/contextStore';
import { observer } from 'mobx-react';
import { Modal } from './layout/modal/Modal';
import { AppContext } from './state/context';
import { Settings, SettingsContext } from './state/settings';
import { PropertyView } from './layout/properties/PropertyView';

export interface AppState {
  contextStore: ContextStore;
}

@observer
export default class App extends Component<any, AppState, any> {
  private renderManager: RenderManager;

  private settings: Settings;

  public constructor(props: any) {
    super(props);

    this.settings = Settings.createOrLoad();

    this.state = {
      contextStore: new ContextStore(this.settings),
    };

    this.renderManager = new RenderManager(this.state.contextStore, this.settings);
  }

  public render(): ReactNode {
    return (
      <SettingsContext.Provider value = {this.settings}>
        <div className='appContainer'>
          <ControlBar context = {this.state.contextStore.context}>
            { this.state.contextStore.context.populateControlBar().map(
              (buttonProps: ControlButtonDescriptor) => (
                <ControlButton
                  key     = {buttonProps.key}
                  title   = {buttonProps.title}
                  type    = {buttonProps.type}
                  onClick = {buttonProps.onClick}
                />)) }
          </ControlBar>

          <DetailView 
            show    = {this.state.contextStore.context instanceof EditorContext}
            context = {this.state.contextStore.context}
          />

          <Viewport 
            context       = {this.state.contextStore.context}
            renderManager = {this.renderManager}
          />
          <Modal 
            visible    = {this.state.contextStore.context.settingsOpen}
            header     = 'Settings'
            closeModal = {this.closeSettings}
          >
            <PropertyView
              item         = {this.settings}
              context      = {this.getContext()}
            >
              
            </PropertyView>
          </Modal>
        </div>
      </SettingsContext.Provider>
    );
  }

  private closeSettings = () => {
    this.settings.save();
    this.getContext().settingsOpen = false;
  }

  private getContext(): AppContext {
    return this.state.contextStore.context;
  }
}
