## ImageIt Panel Plugin for Grafana

Allows a user to superimpose measurement displays ontop of picture.

![ImageIt](https://raw.githubusercontent.com/pierosavi/pierosavi-imageit-panel/master/src/img/imageit_example.png?raw=true) 

### Setup

1. Install the last stable version with `grafana-cli plugins install pierosavi-imageit-panel` or build it from source with `grunt`
2. Enter a URL for your background image.
3. Set up a metric and give it an unique alias.
4. Add a Sensor and give it the same name as the alias.

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

### Coming from picture it?

This was once a [PictureIt](https://github.com/vbessler/grafana-pictureit) fork. The original repo was abandoned long ago so I changed name and id to publish it.

If you have old pictureit panels you can migrate each one by going on: "More... -> Panel JSON" on the panel menu and change "bessler-pictureit-panel" on "type" to "pierosavi-imageit-panel"
