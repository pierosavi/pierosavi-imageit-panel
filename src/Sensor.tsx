import React, {useState} from 'react';
import { css, cx } from 'emotion';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';
import { stylesFactory } from '@grafana/ui';
import SensorType from './Types/Sensor';
import {FieldDisplay} from "@grafana/data";
import {Enable, Resizable} from "re-resizable";
import {Direction} from "re-resizable/lib/resizer";

type SensorProps = {
  sensor: SensorType;
  draggable: boolean;
  resizable: boolean;
  index: string;
  display: FieldDisplay;
  imageDimensions: {
    width: number;
    height: number;
  };
  onPositionChange: Function;
  onResized: Function;
};

const disableResize: Enable = {
  top: false,
  topRight: false,
  right: false,
  bottomRight: false,
  bottom: false,
  bottomLeft: false,
  left: false,
  topLeft: false
}

const pxToPerc = (px: number, size: number): number => {
  return (px * 100) / size;
};

const percToPx = (perc: number, size: number): number => {
  return (perc * size) / 100;
};

export const Sensor: React.FC<SensorProps> = (props: SensorProps) => {
  const size = {
    width: percToPx(props.sensor.size.width, props.imageDimensions.width),
    height: percToPx(props.sensor.size.height, props.imageDimensions.height)
  }
  const {width, height} = size;
  const styles = getStyles();
  const [isMouseOver, setIsMouseOver] = useState(false);

  const onMouseEnter = (_: any) => {
    setIsMouseOver(true);
  };

  const onMouseLeave = (_: any) => {
    setIsMouseOver(false);
  };

  const onDragStop = (event: DraggableEvent, data: DraggableData) => {
    const newPosition = {
      x: pxToPerc(data.x, props.imageDimensions.width),
      y: pxToPerc(data.y, props.imageDimensions.height),
    };
    props.onPositionChange(newPosition, props.index);
  };

  const onResize = (e: MouseEvent| TouchEvent, direction: Direction, ref: HTMLElement, d: any) => {
    let newSize = {
      width: pxToPerc(width + d.width, props.imageDimensions.width),
      height: pxToPerc(height + d.height, props.imageDimensions.height)
    }
    props.onResized(newSize, props.index);
  }

  const sensorPosition = {
    x: percToPx(props.sensor.position.x, props.imageDimensions.width),
    y: percToPx(props.sensor.position.y, props.imageDimensions.height),
  };

  const {display, field} = props.display;
  const {color, numeric} = display;
  console.log(display)

  // const resizeHandleRef = useRef<HTMLImageElement>(null);
  return (
    <>
      {props.sensor.visible && (
        <Draggable
          disabled={props.draggable}
          bounds="#imageItBgImage"
          handle=".handle"
          onStop={onDragStop}
          position={sensorPosition}
        >
          <div
            className={cx(
              styles.container,
              css`
                color: ${props.sensor.fontColor};
                background-color: ${props.sensor.backgroundColor};
              `
            )}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            {
              props.sensor.imageUrl? (
                  <Resizable
                    enable={props.resizable? {...disableResize, bottomRight: true}: disableResize}
                    size={{
                      width: width,
                      height: height
                    }}
                    handleClasses={{
                      bottomRight: '.resize-handle'
                    }}
                    onResizeStop={onResize}
                  >
                    <img
                      className={css`
                        max-height: ${height}px;
                        max-width: ${width}px;
                      `}
                      src={props.sensor.imageUrl}
                      alt={display.title}
                    />
                    {/*{
                      props.resizable && isMouseOver && (
                        <div className={cx(styles.resizeHandler, 'resize-handle')} ref={resizeHandleRef}>
                        </div>
                      )
                    }*/}
                  </Resizable>
                )
                :(
                  <div className={cx(styles.content)}>
                    <a
                      className={css`
                        color: ${props.sensor.fontColor};
                      `}
                      href={props.sensor.link ? props.sensor.link : '#'}
                    >
                      {(props.sensor.displayName || props.sensor.name) + ": "}
                      <span
                        className={css`
                          color: ${color}
                        `}
                      >{numeric}</span>
                      {field.unit||''}
                    </a>

                  </div>
                )
            }
            {!props.draggable && isMouseOver && (
              <div className={cx(styles.handle, 'handle')}>
                <div className="fa fa-bars" />
              </div>
            )}
          </div>
        </Draggable>
      )}
    </>
  );
};

const getStyles = stylesFactory(() => {
  return {
    container: css`
      position: absolute;
      padding: 0.5em;
    `,
    handle: css`
      position: absolute;
      top: 1px;
      right: 1px;
      margin-left: 0.5em;
    `,
    content: css`
      float: left;
    `,
    resizeHandler: css`
      position: absolute;
      cursor: nwse-resize;
      height: 20px;
      width: 20px;
      border-right: grey solid 1px;
      border-bottom: grey solid 1px;
      border-radius: 3px;
      background-color: transparent;
      bottom: 1px;
      right: 1px;
    `
  };
});
