import _ from "lodash";
import {MetricsPanelCtrl} from "app/plugins/sdk";
import "./sprintf.js";
import "./angular-sprintf.js";

const panelDefaults = {
    colorMappings: [],
    colorMappingMap: [],
    valueMappings: [],
    metricValues: [],
    seriesList: [],
    series: [],
    bgimage: '',
    sensors: [],
    height: '400px',
    width: '100px',
    templateSrv: null
};

export class PictureItCtrl extends MetricsPanelCtrl {


    constructor($scope, $injector, templateSrv) {
        super($scope, $injector);
        _.defaults(this.panel, panelDefaults);
        this.templateSrv = templateSrv;
        this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
        this.events.on('panel-initialized', this.render.bind(this));
        this.events.on('data-received', this.onDataReceived.bind(this));
        this.events.on('data-snapshot-load', this.onDataReceived.bind(this));
    }

    onDataReceived(dataList) {
        var dataListLength = dataList.length;
        this.panel.metricValues = [];
        for (var series = 0; series < dataListLength; series++) {
            this.panel.metricValues.push({
                name: dataList[series].target,
                value: dataList[series].datapoints[dataList[series].datapoints.length - 1][0]
            });
        }

        this.render();
    }

    deleteSensor(index) {
        this.panel.sensors.splice(index, 1);
    }

    addSensor() {
        if (this.panel.sensors.length === 0) {
            this.panel.sensors.push(
                new Sensor('Series Name', 200, 200, '%.2f', 'rgba(0, 0, 0, 0.58)', '#000000', 22, 'rgb(251, 4, 4)', true)
            );
        } else {
            var lastSensor = this.panel.sensors[this.panel.sensors.length - 1];
            this.panel.sensors.push(
                new Sensor(lastSensor.metric, 200, 200, lastSensor.format, lastSensor.bgcolor, lastSensor.color, lastSensor.size, lastSensor.bordercolor, true)
            );
        }
    }

    onInitEditMode() {
        this.addEditorTab('Sensor', 'public/plugins/bessler-pictureit-panel/editor.html', 2);
        this.addEditorTab('Color Mapping', 'public/plugins/bessler-pictureit-panel/colors.html', 3);
        this.addEditorTab('Value Color Mapping', 'public/plugins/bessler-pictureit-panel/mappings.html', 4);
    }

    link(scope, elem, attrs, ctrl) {
        const $panelContainer = elem.find('.panel-container');

        function pixelStrToNum(str) {
            return parseInt(str.substr(0, str.length - 2));
        }

        function render() {
            if (!ctrl.panel.sensors) {
                return;
            }
            let width = pixelStrToNum($panelContainer.css("width"));
            let height = pixelStrToNum($panelContainer.css("height"));
            let metricMap = _.keyBy(ctrl.panel.metricValues, value => value.name);
            let valueMappingsMap = _.keyBy(ctrl.panel.valueMappings, mapping => mapping.value);

            for (let sensor of ctrl.panel.sensors) {
                sensor.visible = sensor.xlocation < width && sensor.ylocation < height;
                sensor.ylocationStr = sensor.ylocation.toString() + "px";
                sensor.xlocationStr = sensor.xlocation.toString() + "px";
                sensor.sizeStr = sensor.size.toString() + "px";
                sensor.bgcolor = 'rgb(64, 64, 64)';
                sensor.bordercolor = 'rgb(64, 64, 64)';

                //We need to replace possible variables in the sensors name
                var effectiveName = ctrl.templateSrv.replace(sensor.metric);

                var mValue = metricMap[effectiveName];
                if (mValue === undefined) {
                    mValue = {name: "dummy", value: 'null'};
                }

                var valueMapping = valueMappingsMap[mValue.value];

                if (valueMapping !== undefined) {
                    let colorMapping = ctrl.panel.colorMappingMap[valueMapping.colorName];
                    if (colorMapping !== undefined) {
                        sensor.bgcolor = colorMapping.color;
                        sensor.bordercolor = colorMapping.color;
                    }
                }

                //finally format the value itself
                sensor.valueFormatted = sprintf(sensor.format,mValue.value);
            }
        }

        this.events.on('render', function () {
            render();
            ctrl.renderingCompleted();
        });
    }


    //------------------
    // Color mapping stuff
    //------------------

    addColorMapping() {
        this.panel.colorMappings.push(new ColorMapping('name', '#FFFFFF'));
        this.refreshColorMappings();
    }

    removeColorMapping(map) {
        var index = _.indexOf(this.panel.colorMappings, map);
        this.panel.colorMappings.splice(index, 1);
        this.refreshColorMappings();
    }

    refreshColorMappings() {
        this.panel.colorMappingMap = _.keyBy(this.panel.colorMappings, mapping => mapping.name);
        this.render();
    }


    //------------------
    // Mapping stuff
    //------------------

    addValueMappingMap() {
        this.panel.valueMappings.push(new ValueColorMapping('value', ''));
    }

    removeValueMappingMap(toRemove) {
        var index = _.indexOf(this.panel.valueMappings, toRemove);
        this.panel.valueMappings.splice(index, 1);
        this.render();
    }

    /* addRangeMappingMap() {
     this.panel.rangeMappingMap.push({from: '', to: '', text: ''});
     }

     removeRangeMappingMap(rangeMap) {
     var index = _.indexOf(this.panel.rangeMaps, rangeMap);
     this.panel.rangeMappingMap.splice(index, 1);
     this.render();
     };*/
}

function ValueColorMapping(value,
                           colorName) {
    'use strict';
    this.value = value;
    this.colorName = colorName;
}


function ColorMapping(name, color) {
    'use strict';
    this.name = name;
    this.color = color;
}

function Sensor(metric,
                xlocation,
                ylocation,
                format,
                bgcolor,
                fontColor,
                size,
                bordercolor,
                visible) {
    'use strict';
    this.metric = metric;
    this.xlocation = xlocation;
    this.ylocation = ylocation;
    this.format = format;
    this.bgcolor = bgcolor;
    this.fontColor = fontColor;
    this.size = size;
    this.bordercolor = bordercolor;
    this.visible = visible;
    this.renderValue = false;
    this.valueFormatted = '';
    this.valueUnit = '';
    this.displayName = '';
}
PictureItCtrl.templateUrl = 'module.html';
