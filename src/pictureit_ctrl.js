import _ from "lodash";
import {MetricsPanelCtrl} from "app/plugins/sdk";
import "./sprintf.js";
import "./angular-sprintf.js";


const DEFAULT_BG_COLOR = 'rgb(64, 64, 64)';

const panelDefaults = {
    colorMappings: [],
    colorMappingMap: [],
    valueMappings: [],
    seriesList: [],
    series: [],
    bgimage: '',
    sensors: [],
    height: '400px',
    width: '100px',
    templateSrv: null
};

export class PictureItCtrl extends MetricsPanelCtrl {


    constructor($scope, $injector, templateSrv,variableSrv) {
        super($scope, $injector);
        _.defaults(this.panel, panelDefaults);
        this.templateSrv = templateSrv;
        this.variableSrv = variableSrv;
        this.variables = this.variableSrv.variables;
        this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
        this.events.on('panel-initialized', this.render.bind(this));
        this.events.on('data-received', this.onDataReceived.bind(this));
        this.events.on('data-snapshot-load', this.onDataReceived.bind(this));
    }

    onDataReceived(dataList) {
        var dataListLength = dataList.length;
        this.metricValues = [];
        this.metricValueMap = [];
        for (var series = 0; series < dataListLength; series++) {
            this.metricValues.push({
                name: dataList[series].target,
                value: dataList[series].datapoints[dataList[series].datapoints.length - 1][0]
            });
        }
        this.metricValueMap = _.keyBy(this.metricValues, value => value.name);
        this.render();
    }

    deleteSensor(index) {
        this.panel.sensors.splice(index, 1);
    }

    addSensor() {
        if (this.panel.sensors.length === 0) {
            this.panel.sensors.push(
                new Sensor('Series Name', 200, 200, '%.2f', 'rgba(0, 0, 0, 0.58)', 22, true)
            );
        } else {
            var lastSensor = this.panel.sensors[this.panel.sensors.length - 1];
            this.panel.sensors.push(
                new Sensor(lastSensor.metric, 200, 200, lastSensor.format, lastSensor.color, lastSensor.size, true)
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

            for (let sensor of ctrl.panel.sensors) {
                sensor.visible = sensor.xlocation < width && sensor.ylocation < height;
                sensor.ylocationStr = sensor.ylocation.toString() + "px";
                sensor.xlocationStr = sensor.xlocation.toString() + "px";
                sensor.sizeStr = sensor.size.toString() + "px";
            }
        }

        this.events.on('render', function () {
            render();
            ctrl.renderingCompleted();
        });
    }

    getBackgroundColor(sensor) {
        const valueMappingsMap = _.keyBy(this.panel.valueMappings, mapping => mapping.value);
        const effectiveName = this.templateSrv.replace(sensor.metric);

        var mValue = this.metricValueMap[effectiveName];
        if (mValue === undefined) {
            mValue = {name: "dummy", value: 'null'};
        }

        var valueMapping = valueMappingsMap[mValue.value];

        if (valueMapping !== undefined) {
            const colorMapping = this.panel.colorMappingMap[valueMapping.colorName];
            if (colorMapping !== undefined) {
                return colorMapping.color;
            }
        }
        return DEFAULT_BG_COLOR;
    }

    formatValue(sensor) {
        return sprintf(sensor.format, this.metricValueMap[this.templateSrv.replace(sensor.metric)].value);
    }

    determineLinkUrl(sensor) {
        return this.templateSrv.replace(sensor.link_url);
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
                fontColor,
                size,
                visible) {
    'use strict';
    this.metric = metric;
    this.xlocation = xlocation;
    this.ylocation = ylocation;
    this.format = format;
    this.fontColor = fontColor;
    this.size = size;
    this.visible = visible;
    this.renderValue = false;
    this.valueUnit = '';
    this.displayName = '';
    this.link_url = '';
}
PictureItCtrl.templateUrl = 'module.html';
