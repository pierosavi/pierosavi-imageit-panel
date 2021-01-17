import React from 'react';
import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types/SimpleOptions';
import { ImageItPanel } from './ImageItPanel';
import { EditorSensorList } from 'customEditors/EditorSensorList';
import { EditorOverrideList } from 'customEditors/EditorMappingList';

export const plugin = new PanelPlugin<SimpleOptions>(ImageItPanel).setPanelOptions(builder => {
  const panelOptionsBuilder = builder
    .addTextInput({
      path: 'imageUrl',
      name: 'Image URL',
      description: 'URL of background image',
      defaultValue: 'https://i.ibb.co/tLXrjb6/imageit.png',
    })
    .addBooleanSwitch({
      path: 'lockSensors',
      name: 'Lock sensors movement',
      defaultValue: false,
      category: ['Sensors'],
    })
    .addNumberInput({
      path: 'sensorsTextSize',
      name: 'Sensors text size',
      // description: 'Text size',
      defaultValue: 1,
      category: ['Sensors'],
    })
    .addCustomEditor({
      id: 'sensors',
      path: 'sensors',
      name: 'Sensors',
      description: 'List of sensors',
      category: ['Sensors'],
      defaultValue: [],
      editor: props => {
        return <EditorSensorList sensors={props.value} onChange={props.onChange} />;
      },
    })
    .addCustomEditor({
      id: 'mappings',
      path: 'mappings',
      name: 'Mappings',
      description: 'List of mappings',
      category: ['Mappings'],
      defaultValue: [],
      editor: props => {
        return <EditorOverrideList mappings={props.value} onChange={props.onChange} />;
      },
    });

  return panelOptionsBuilder;
});
