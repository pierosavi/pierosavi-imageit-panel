# v1.0.6

## Fix

* Remove enableNamedColors, which caused some colors to not render correctly - thanks [peishaofeng](https://github.com/peishaofeng)
* UI Slowdown on v8.3.3 - thanks [rvdwijngaard](https://github.com/rvdwijngaard)

# v1.0.5

## Improvements

* Multiple mappings support
* Override value on mapping

# v1.0.4

## Improvements

* Variable support on sensor name
* Variable support on sensor link
* Add support for Grafana v8+

# v1.0.3

## Improvements

* Better data format to support more data sources

# v1.0.2

## Fix

* No data showing when query returned 0

# v1.0.1

## Improvements

* Change grafana version requirements to every grafana 7 version instead of 7.0.x
* Add No Data text on sensor when no data is received

# v1.0.0

## Features

* Full compatibility with Grafana 7+
* Rewritten from scratch in React

## Differences from v0

### Features missing

* Font awesome icons in sensor name
* Font size configurable per sensor
* Multiple mappings for sensor

### Improvements

* Removed "snap to grid" effect
* Set default font size to 10
* Cleaner UI
