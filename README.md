![GitHub release (latest by date)](https://img.shields.io/github/v/release/pierosavi/pierosavi-imageit-panel?logo=github)
[![Marketplace](https://img.shields.io/badge/dynamic/json?logo=grafana&color=F47A20&label=marketplace&prefix=v&query=version&url=https%3A%2F%2Fgrafana.com%2Fapi%2Fplugins%2Fpierosavi-imageit-panel)](https://grafana.com/grafana/plugins/pierosavi-imageit-panel)
[![Downloads](https://img.shields.io/badge/dynamic/json?logo=grafana&color=F47A20&label=downloads&query=downloads&url=https%3A%2F%2Fgrafana.com%2Fapi%2Fplugins%2Fpierosavi-imageit-panel)](https://grafana.com/grafana/plugins/pierosavi-imageit-panel)

# !! Warning !! No new features, support will stop at Grafana 9.

I initially developed this panel as I used Grafana daily at my previous job and, surprisingly, a panel like this didn't really exist.

Sadly I don't work with Grafana anymore and it seems like every major Grafana update breaks the panel over and over again, requiring a lot of maintenance.

I don't have the time and the right motivation anymore to create new features and fix every compatiblity bug as they appear, so I decided that I will not support Grafana 9 and the repo will probably be archived when it comes out.

If your use case requires a panel like this feel free to fork, rename and upload your version for Grafana >=9

# ImageIt Panel Plugin for Grafana

Allows a user to superimpose measurement displays ontop of a picture.

![ImageIt](https://raw.githubusercontent.com/pierosavi/pierosavi-imageit-panel/master/src/img/imageit_example.png?raw=true)

# READ BEFORE UPDATING

If you are migrating to v0.x to v1 there is a step you must take to preserve the data.

Why, How, When: https://github.com/pierosavi/imageit-migration/blob/master/README.md

Migration website: https://pierosavi.github.io/imageit-migration/

## Setup

[How to install](https://grafana.com/docs/grafana/latest/plugins/installation/)

## Features

* Sensors stay in the same position, even when resizing the panel
* Draggable sensors
* Sensors resize with the panel
* Plugin compatibility with Grafana 7+
* Plugin canvas compatible with larger images
* Links on sensors
* Change sensors text and background color
* Value mapping system
* Multiple mappings for sensor - Thanks [@lukaszsamson](https://github.com/lukaszsamson)

## What features are missing from the previous version?
* Font awesome icons in sensor name
* Font size configurable per sensor

They will come in the next versions, if requested

 ## FAQ

### Why do I have to go trough the migration tool to keep configurations coming from v0.1.3?
This plugin was originally a fork of an unmantained plugin. Because of this I wanted to keep compatibility between the two as high as possible, sadly that plugin wasn't developed with best practices in mind.

With the new Grafana sdk I had to rewrite the plugin from scratch and all the old configurations are impossible to read from the new version.

### What's up with the force image refresh warning?
You should switch it on only if you have control over the image hosting service. If not you could fill the users' browser cache fast. [Check this for more info](https://stackoverflow.com/questions/1077041/refresh-image-with-a-new-one-at-the-same-url)


### Can I host my images inside my Grafana instance?
Kinda. Grafana doesn't have an official way but there's a workaround. If you have access to your Grafana instance's files you can add your file at `/usr/share/grafana/public/img/` and reach it at `/public/img/yourimage.jpg`. Note that images added like this will be deleted during the next Grafana update and this workaround might not work in the future.

If you don't have access to the files or don't know how to do it I can't help you.

### Is v1.x.x compatible with Grafana 5/6?
No, use v0.1.3 or update to Grafana v7+.
