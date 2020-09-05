import React from 'react';
import {FieldConfigProperty, PanelPlugin, ReducerID, standardEditorsRegistry, ThresholdsMode} from '@grafana/data';
import {SimpleOptions} from './Types/SimpleOptions';
import {ImageItPanel} from './ImageItPanel';
import {EditorSensorList} from 'CustomEditors/EditorSensorList';

export const plugin = new PanelPlugin<SimpleOptions>(ImageItPanel).setPanelOptions(builder => {
  return builder
    .addCustomEditor({
      id: 'reduceOptions.calcs',
      path: 'reduceOptions.calcs',
      name: 'Calculation',
      editor: standardEditorsRegistry.get('stats-picker').editor as any,
      defaultValue: ReducerID.mean
    })
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
    .addBooleanSwitch({
      path: 'allowResie',
      name: 'Allow resize sensors',
      defaultValue: true
    })
    .addCustomEditor({
      id: 'sensors',
      path: 'sensors',
      name: 'Sensors',
      description: 'List of sensors',
      editor: props => {
        return <EditorSensorList sensors={props.value} onChange={props.onChange}/>;
      },
    });
}).useFieldConfig({
  standardOptions: [FieldConfigProperty.Unit, FieldConfigProperty.Decimals, FieldConfigProperty.Thresholds],
  standardOptionsDefaults: {
    [FieldConfigProperty.Unit]: '',
    [FieldConfigProperty.Decimals]: 2,
    [FieldConfigProperty.Thresholds]: {
      mode: ThresholdsMode.Absolute,
      steps:[{
        value: -Infinity,
        color: '#fff'
      }]
    }
  }
});
