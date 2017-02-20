## PictureIt Panel Plugin for Grafana

Allows a user to superimpose measurement displays ontop of picture.

### PictureIt  

1. Enter a URL for your background image.
2. Set up some metrics (Influx and "fake data source" tested).
3. Then add sensor displays ontop of the picture and tie them to the metrics.

![PictureIt](https://raw.githubusercontent.com/vbessler/grafana-pictureit/master/src/img/bridge_strains.png?raw=true) 

### Options  

Each measurement display is linked to a metric through the metrics name or alias.  If the metric returns a series of values then the last values is displayed.

![Options](https://raw.githubusercontent.com/vbessler/grafana-pictureit/master/src/img/settings.png?raw=true) 