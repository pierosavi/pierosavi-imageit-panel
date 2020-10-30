## ImageIt Panel Plugin for Grafana

Allows a user to superimpose measurement displays ontop of picture.

![ImageIt](https://raw.githubusercontent.com/pierosavi/pierosavi-imageit-panel/master/src/img/imageit_example.png?raw=true) 

### Setup

WIP

### How to build

Prerequisites: `git` , `node 12`, `yarn 1`

Open Terminal on MacOs or Cmd on Windows inside your grafana plugins folder

Paste these commands:
* `git clone --single-branch --branch react-migration git@github.com:pierosavi/pierosavi-imageit-panel.git`
* `cd pierosavi-imageit-panel`
* `yarn`
* `yarn build`

Restart Grafana instance

### Features

* Sensors stay in the same position, even when resizing the panel
* Draggable sensors
* Resizing sensors when resizing the panel
* Plugin compatibility with Grafana 7+
* Plugin canvas compatible with larger images
* Links on sensors
* Change sensors background color (even transparent)
* Font Awesome Icons - Images mapping on sensor name - WIP
* Value mapping system - WIP
