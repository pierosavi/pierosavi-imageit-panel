import React from 'react';
import {PanelPlugin} from '@grafana/data';
import {SimpleOptions} from './Types/SimpleOptions';
import {ImageItPanel} from './ImageItPanel';
import {EditorSensorList} from 'CustomEditors/EditorSensorList';

export const plugin = new PanelPlugin<SimpleOptions>(ImageItPanel).setPanelOptions(builder => {
  return builder
    .addTextInput({
      path: 'imageUrl',
      name: 'Image URL',
      description: 'URL of base image',
      defaultValue: 'https://i.ibb.co/tLXrjb6/imageit.png',
    })
    .addBooleanSwitch({
      path: 'lockSensors',
      name: 'Lock sensors movement',
      defaultValue: false,
    })
    // .addRadio({
    //   path: 'sensorTextSize',
    //   defaultValue: 'sm',
    //   name: 'Sensor text size',
    //   settings: {
    //     options: [
    //       {
    //         value: 'sm',
    //         label: 'Small',
    //       },
    //       {
    //         value: 'md',
    //         label: 'Medium',
    //       },
    //       {
    //         value: 'lg',
    //         label: 'Large',
    //       },
    //     ],
    //   },
    //   // showIf: config => config.showSeriesCount,
    // })
    .addCustomEditor({
      id: 'sensors',
      path: 'sensors',
      name: 'Sensors',
      description: 'List of sensors',
      editor: props => {
        return <EditorSensorList sensors={props.value} onChange={props.onChange}/>;
      },
    });
})/*.useFieldConfig({
  standardOptions: [
    FieldConfigProperty.Thresholds,
    FieldConfigProperty.Title,
    FieldConfigProperty.Unit,
    FieldConfigProperty.Decimals,
    FieldConfigProperty.NoValue
  ]
})*/
