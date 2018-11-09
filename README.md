## PictureIt Panel Plugin for Grafana

Allows a user to superimpose measurement displays ontop of picture.

### PictureIt  

1. Enter a URL for your background image.
2. Set up some metrics (Influx and "fake data source" tested).
3. Then add sensor displays ontop of the picture and tie them to the metrics.

![PictureIt](https://raw.githubusercontent.com/vbessler/grafana-pictureit/master/src/img/bridge_strains.png?raw=true) 

### New Features

* Sensors stay still, even when resizing the panel
* Draggable sensors (Done, to clean the code a bit)
* Resizing sensors when resizing the panel (Done! You can't edit the font size manually anymore)
