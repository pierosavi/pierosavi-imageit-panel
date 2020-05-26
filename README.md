## Rewrite

The plugin is currently being rewritten in React following the new Grafana Plugin standard

New PRs for the old Angular V1 version will not be accepted

## ImageIt Panel Plugin for Grafana

Allows a user to superimpose measurement displays ontop of picture.

![ImageIt](https://raw.githubusercontent.com/pierosavi/pierosavi-imageit-panel/master/src/img/imageit_example.png?raw=true) 

### Setup

1. Install the last stable version with `grafana-cli plugins install pierosavi-imageit-panel` or clone master for the latest features.
2. Enter a URL for your background image.
3. Set up a metric and give it an unique alias.
4. Add a Sensor and give it the same name as the alias.

### How to build

`npm run build`

Master branch is always built before pushing

### Features

* Sensors stay in the same position, even when resizing the panel
* Draggable sensors
* Resizing sensors when resizing the panel
* Plugin compatibility with Grafana 5/6
* Plugin canvas compatible with larger images
* Links on sensors
* Change sensors background color (even transparent)
* Font Awesome Icons - Images mapping on sensor name
* Value mapping system
