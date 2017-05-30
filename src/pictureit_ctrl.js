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
    width: '100px'
};

export class PictureItCtrl extends MetricsPanelCtrl {


    constructor($scope, $injector) {
        super($scope, $injector);
        _.defaults(this.panel, panelDefaults);

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
        if (this.panel.sensors.length === 0)
            this.panel.sensors.push({
                name: 'A-series',
                xlocation: 200,
                ylocation: 200,
                format: '%.2f',
                bgcolor: 'rgba(0, 0, 0, 0.58)',
                color: '#000000',
                size: 22,
                bordercolor: 'rgb(251, 4, 4)',
                visible: true
            });
        else {
            var lastSensor = this.panel.sensors[this.panel.sensors.length - 1];

            this.panel.sensors.push({
                name: lastSensor.name,
                xlocation: 200,
                ylocation: 200,
                format: lastSensor.format,
                bgcolor: lastSensor.bgcolor,
                color: lastSensor.color,
                size: lastSensor.size,
                bordercolor: lastSensor.bordercolor,
                visible: true
            });
        }
    }

    onInitEditMode() {
        this.addEditorTab('Options', 'public/plugins/bessler-pictureit-panel/editor.html', 2);
        this.addEditorTab('Color Mapping', 'public/plugins/bessler-pictureit-panel/colors.html', 3);
        this.addEditorTab('Value Color Mapping', 'public/plugins/bessler-pictureit-panel/mappings.html', 4);
    }

    link(scope, elem, attrs, ctrl) {
        var sensors;
        var metricValues;
        var valueMappings;
        var colorMap;

        const $panelContainer = elem.find('.panel-container');

        function pixelStrToNum(str) {
            return parseInt(str.substr(0, str.length - 2));
        }

        function render() {
            if (!ctrl.panel.sensors) {
                return;
            }
            var width = pixelStrToNum($panelContainer.css("width"));
            var height = pixelStrToNum($panelContainer.css("height"));

            sensors = ctrl.panel.sensors;
            metricValues = ctrl.panel.metricValues;
            valueMappings = ctrl.panel.valueMappings;
            colorMap = ctrl.panel.colorMappingMap;
            var metricMap = _.keyBy(ctrl.panel.metricValues, value => value.name);

            for (var sensor = 0; sensor < sensors.length; sensor++) {
                sensors[sensor].visible = sensors[sensor].xlocation < width && sensors[sensor].ylocation < height;
                sensors[sensor].ylocationStr = sensors[sensor].ylocation.toString() + "px";
                sensors[sensor].xlocationStr = sensors[sensor].xlocation.toString() + "px";
                sensors[sensor].sizeStr = sensors[sensor].size.toString() + "px";
                sensors[sensor].bgcolor = 'rgb(64, 64, 64)'
                sensors[sensor].bordercolor = 'rgb(64, 64, 64)';

                var mValue = metricMap[sensors[sensor].name];
                if (mValue === undefined) {
                    mValue = {name: "dummy", value: 'null'};
                }

                var found = _.find(valueMappings, function (mapping) {
                    if (mapping.value == mValue.value) {
                        return mapping;
                    }
                });

                if (found !== undefined) {
                    var colorMapping = colorMap[found.colorName];
                    if (colorMapping !== undefined) {
                        sensors[sensor].bgcolor = colorMapping.color;
                        sensors[sensor].bordercolor = colorMapping.color;
                    }
                }
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

PictureItCtrl.templateUrl = 'module.html';
