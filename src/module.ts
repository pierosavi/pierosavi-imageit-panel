import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions(builder => {
  return builder
    .addTextInput({
      path: 'imageUrl',
      name: 'Image URL',
      description: 'URL of base image',
      defaultValue: 'https://i.picsum.photos/id/522/400/400.jpg',
    })
    .addBooleanSwitch({
      path: 'showLock',
      name: 'Show Lock',
      defaultValue: false,
    })
    .addRadio({
      path: 'sensorTextSize',
      defaultValue: 'sm',
      name: 'Sensor text size',
      settings: {
        options: [
          {
            value: 'sm',
            label: 'Small',
          },
          {
            value: 'md',
            label: 'Medium',
          },
          {
            value: 'lg',
            label: 'Large',
          },
        ],
      },
      // showIf: config => config.showSeriesCount,
    });
});
