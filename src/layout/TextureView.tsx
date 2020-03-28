import React, { RefObject } from 'react';
import { Component, ReactNode } from 'react';
import './Layout.css';
import { observer } from 'mobx-react';
import { AppContext } from '../state/context';
import { EditorContext } from '../state/editorContext';
import { Texture } from '../model/texture';
import { Assembly } from '../model/entityModel';

export interface TextureViewProps {
  context: AppContext;
}

@observer
export class TextureView extends Component<TextureViewProps> {
  private uvMapCanvasRef: RefObject<HTMLCanvasElement>;

  public constructor(props: TextureViewProps) {
    super(props);

    this.uvMapCanvasRef = React.createRef();
  }

  public componentDidMount(): void {
    const canvas = this.uvMapCanvasRef.current;

    if(canvas && this.props.context instanceof EditorContext) {
      const context = canvas.getContext('2d');

      if(context) {
        this.draw(context);
      }
    }
  }

  public componentDidUpdate(): void {

  }

  public render(): ReactNode {
    return (
        <canvas
          ref = {this.uvMapCanvasRef}
        >

        </canvas>
    );
  }

  private draw(context: CanvasRenderingContext2D): void {
    let texture: Texture | undefined = undefined;

    if(this.props.context instanceof EditorContext && this.props.context.selection) {
      const selection = this.props.context.selection;

      if(selection instanceof Texture) {
        texture = selection;
      } else if(selection instanceof Assembly) {
        texture = selection.texture;
      } else {
        const parent = selection.getParent();
        if(parent && parent instanceof Assembly) {
          texture = parent.texture;
        }
      }
    }

    if(texture) {
      texture.drawUVMap(context);
    }
  }
}
