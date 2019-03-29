import _ from "lodash";
import {MetricsPanelCtrl} from "app/plugins/sdk";
import "./sprintf.js";
import "./angular-sprintf.js";
import getWidth from './stringwidth/strwidth.js';
import interact from './libs/interact';

const panelDefaults = {
    colorMappings: [],
    colorMappingMap: [],
    valueMappings: [],
    metricValues: [],
    seriesList: [],
    series: [],
    bgimage: '',
    sensors: [],
    groups: [],
    useLabelGroupings: false,
    height: '400px',
    width: '100px',
    templateSrv: null,
    sizecoefficient: 20,
    //uncache is a random number added to the img url to refresh it
    uncache: 0
};

let isTheFirstRender = true

export class ImageItCtrl extends MetricsPanelCtrl {

    constructor($scope, $injector, $sce, templateSrv) {
        super($scope, $injector);
        _.defaults(this.panel, panelDefaults);
        this.templateSrv = templateSrv;
        this.$sce = $sce;
        this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
        this.events.on('panel-initialized', this.render.bind(this));
        this.events.on('data-received', this.onDataReceived.bind(this));
        this.events.on('data-snapshot-load', this.onDataReceived.bind(this));
    }

    onDataReceived(dataList) {
        const dataListLength = dataList.length;
        this.panel.metricValues = [];
        for (let series = 0; series < dataListLength; series++) {
            this.panel.metricValues.push({
                name: dataList[series].target,
                value: dataList[series].datapoints[dataList[series].datapoints.length - 1][0]
            });
        }

        if(!isTheFirstRender) {
            this.refreshImage()
        } else {
            isTheFirstRender = false
        }
        

        this.render();
    }

    refreshImage(){
        this.panel.uncache = Math.random()
    }

    deleteSensor(index) {
        this.panel.sensors.splice(index, 1);
    }

    addSensor() {
        this.panel.sensors.push(
            new Sensor('A', 50, 25, '%.2f', 'rgba(64,64,64,1.000)', 'rgba(255,255,255,1.000)', 14, true)
        );
    }

    moveSensorUp(index) {
        const sensor = this.panel.sensors[index]
        this.panel.sensors.splice(index, 1)
        this.panel.sensors.splice(index-1,0,sensor);
    }

    moveSensorDown(index) {
        const sensor = this.panel.sensors[index]
        this.panel.sensors.splice(index, 1)
        this.panel.sensors.splice(index+1,0,sensor);
    }

    deleteGroup(index) {
        this.panel.groups.splice(index, 1);
    }

    addGroup() {
        this.panel.groups.push(
            new Group('A', "left", 50, 50)
        );
    }

    getAvailableGroups() {

        const result = ctrl.panel.groups.map(g => g.name);
        alert("RESULT: " + JSON.stringify(result))
        return result;
    }

    onInitEditMode() {
        this.addEditorTab('Sensor', 'public/plugins/pierosavi-imageit-panel/editor.html', 2);
        this.addEditorTab('Color Mapping', 'public/plugins/pierosavi-imageit-panel/colors.html', 3);
        this.addEditorTab('Value Mapping', 'public/plugins/pierosavi-imageit-panel/mappings.html', 4);
    }

    link(scope, elem, attrs, ctrl) {
        const panelContainer = (elem.find('.pierosavi-imageit-panel')[0]);
        const image = (panelContainer.querySelector('#imageit-image'))

        function getGroup(name) {
            for (let group of ctrl.panel.groups) {
                if(group.name == name){
                    return group;
                }
            }
            return null;
        }

        function render() {

            if (!ctrl.panel.sensors) {
                return;
            }

            let metricMap = _.keyBy(ctrl.panel.metricValues, value => value.name);
            let valueMappingsMap = _.keyBy(ctrl.panel.valueMappings, mapping => mapping.value);

            for (let sensor of ctrl.panel.sensors) {

                if(!sensor.hasOwnProperty('id')){
                    sensor.id = getRandomId()
                }

                if (image != null) {
                    let imageWidth = image.offsetWidth;
                    sensor.size = imageWidth * ctrl.panel.sizecoefficient / 1600
                }

                const sensorWidth = getWidth(sensor.displayName, { font: 'Arial', size: sensor.size }) + 20;
                if(ctrl.panel.useLabelGroupings){
                    const group = getGroup(sensor.group.name)
                    if(group != null && group.sameSize){
                        const newValue = Math.max(group.width, sensorWidth);
                        group.width = newValue;
                        sensor.width = newValue;
                    }else{
                        sensor.panelWidth = sensorWidth + "px";  
                        sensor.width = sensorWidth;
                    }
                }else{
                    sensor.panelWidth = sensorWidth + "px";  
                    sensor.width = sensorWidth;
                }
            }

            for (let sensor of ctrl.panel.sensors) {
                if(ctrl.panel.useLabelGroupings && group.sameSize){
                    const group = getGroup(sensor.group.name)
                    if(group != null){
                        sensor.panelWidth = group.width + "px";  
                        sensor.width = group.width;
                    }
                }

                if(!ctrl.panel.useLabelGroupings){
                    sensor.ylocationStr = sensor.ylocation.toString() + "px";
                    sensor.xlocationStr = sensor.xlocation.toString() + "px";
                }else{
                    alignSensors();
                }
                sensor.sizeStr = sensor.size.toString() + "px";
                
                if(sensor.rectangular){
                    sensor.borderRadius = '5%'
                }else{
                    sensor.borderRadius = '50%'
                }

                if(sensor.link_url != undefined) {
                    sensor.resolvedLink =ctrl.templateSrv.replace(sensor.link_url);
                }

                //We need to replace possible variables in the sensors name
                const effectiveName = ctrl.templateSrv.replace(sensor.metric);

                let mValue = metricMap[effectiveName];
                if (mValue === undefined) {
                    mValue = {name: "dummy", value: 'null'};
                }

                let valueMapping = valueMappingsMap[mValue.value];

                if (valueMapping !== undefined) {
                    let colorMapping = ctrl.panel.colorMappingMap[valueMapping.colorName];
                    if (colorMapping !== undefined) {
                        sensor.bgColor = colorMapping.color;
                    }
                }

                //finally format the value itself
                sensor.valueFormatted = sprintf(sensor.format,mValue.value);
            }

            dragEventSetup();
            
        }

        function dragEventSetup() {
            window.interact('#imageit_panel' + ctrl.panel.id + '_sensor').draggable({
                // I dont like it personally but this could be configurable in the future
                inertia: false,
                restrict: {
                    restriction: "#draggableparent",
                    endOnly: true,
                    elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
                },
                autoScroll: true,
                onmove: function (event) {
                    const target = event.target,
                    // keep the dragged position in the data-x/data-y attributes
                    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                    // translate the element
                    target.style.webkitTransform =
                    target.style.transform =
                    'translate(' + x + 'px, ' + y + 'px)';

                    // update the position attributes
                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);

                },
                onend: function (event) {
                    const target = event.target;

                    let imageHeight = image.offsetHeight;
                    let imageWidth = image.offsetWidth;

                    let x = target.getAttribute('data-x');
                    let y = target.getAttribute('data-y')

                    // get percentage of relative distance from starting point 
                    let xpercentage = (x * 100) / imageWidth;
                    let ypercentage = (y * 100) / imageHeight;

                    // browsers dont render more than 4 decimals so better cut away the others
                    let newX = parseInt(target.style.left) + xpercentage;
                    newX = Math.round(newX * 10000) / 10000

                    let newY = parseInt(target.style.top) + ypercentage;
                    newY = Math.round(newY * 10000) / 10000

                    target.style.webkitTransform =
                    target.style.transform =
                    'translate(0px, 0px)';
                    
                    // manually set the new style so I don't need to render() again
                    target.style.left = newX + '%'
                    target.style.top = newY + '%'

                    // really update the sensor values

                    //find sensor with the id from the refId attribute on html
                    let sensor = _.find(ctrl.panel.sensors, {'id': (event.target).getAttribute('refId')})

                    sensor.xlocation = newX
                    sensor.ylocation = newY

                    // reset the starting sensor points
                    target.setAttribute('data-x', 0);
                    target.setAttribute('data-y', 0);
                }
            });
        }

        function alignSensors(){
            for (let group of ctrl.panel.groups) {
                group.nextTop = undefined;
                group.nextX = undefined;
            }
            for (let sensor of ctrl.panel.sensors) {
                const sensorHeight = sensor.size + 30;
                const sensorWidth = sensor.width + 10;
                let group = getGroup(sensor.group.name)
                if(group.alignment == "left"){
                    if(group.nextTop === undefined){
                        group.nextTop = group.y;
                    }
                    sensor.ylocationStr = group.nextTop + "px";
                    sensor.xlocationStr = group.x + "px";
                    group.nextTop = group.nextTop + sensorHeight;
                } else if(group.alignment == "middle"){
                    if(group.nextTop === undefined){
                        group.nextTop = group.y;
                    }
                    sensor.ylocationStr = group.nextTop + "px";
                    if(group.sameSize){
                        sensor.xlocationStr = (group.x - (group.width/2)) + "px";
                    }else{
                        sensor.xlocationStr = (group.x - (sensor.width/2))+ "px";
                    }
                    group.nextTop = group.nextTop + sensorHeight;
                } else if(group.alignment == "right"){
                    if(group.nextTop === undefined){
                        group.nextTop = group.y;
                    }
                    sensor.ylocationStr = group.nextTop + "px";
                    if(group.sameSize){
                        sensor.xlocationStr = (group.x - group.width) + "px";
                    }else{
                        sensor.xlocationStr = (group.x - sensor.width)+ "px";
                    }
                    group.nextTop = group.nextTop + sensorHeight;
                } else if(group.alignment == "top"){
                    if(group.nextX === undefined){
                        group.nextX = group.x;
                    }
                    sensor.xlocationStr = group.nextX + "px";
                    sensor.ylocationStr = group.y + "px";
                    group.nextX = group.nextX + sensorWidth;
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
        const index = _.indexOf(this.panel.colorMappings, map);
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
        const index = _.indexOf(this.panel.valueMappings, toRemove);
        this.panel.valueMappings.splice(index, 1);
        this.render();
    }

    replaceTokens(value) {

        if (!value) { return value; }
        value = value + "";
        value = value.split(" ").map(a => {
            if (a.startsWith("_fa-") && a.endsWith("_")) {
                let icon = a.replace(/\_/g, "").split(",")[0];
                let color = a.indexOf(",") > -1 ? ` style="color:${normalizeColor(a.replace(/\_/g, "").split(",")[1])}" ` : "";     
                let repeatCount = a.split(",").length > 2 ? +(a.replace(/\_/g, "").split(",")[2]) : 1;
                a = `<i class="fa ${icon}" ${color}></i> `.repeat(repeatCount);
                
            } else if (a.startsWith("_img-") && a.endsWith("_")) {
                a = a.slice(0, -1);
                let imgUrl = a.replace("_img-", "").split(",")[0];
                let imgWidth = a.split(",").length > 1 ? a.replace("_img-", "").split(",")[1] : "20px";
                let imgHeight = a.split(",").length > 2 ? a.replace("_img-", "").split(",")[2] : "20px";
                let repeatCount = a.split(",").length > 3 ? +(a.replace("_img-", "").split(",")[3]) : 1;
                a = `<img width="${imgWidth}" height="${imgHeight}" src="${imgUrl}"/>`.repeat(repeatCount);
            }
            return a;
        }).join(" ");

        return this.$sce.trustAsHtml(value);
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

function getRandomId() {
    return '_' + Math.random().toString(36).substr(2, 9);
};

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
                bgColor,
                fontColor,
                size,
                visible) {
    'use strict';
    this.metric = metric;
    this.xlocation = xlocation;
    this.ylocation = ylocation;
    this.format = format;
    this.bgColor = bgColor;
    this.fontColor = fontColor;
    this.size = size;
    this.visible = visible;
    this.renderValue = false;
    this.valueFormatted = '';
    this.valueUnit = '';
    this.displayName = '';
    this.link_url = '';
    this.resolvedLink = '';
    this.rectangular = true;
    this.group = 'A';
    this.id = getRandomId()
}

function Group(name, alignment, x, y) {
    'use strict';
    this.name = name;
    this.alignment = alignment;
    this.x = x;
    this.y = y;
    this.sameSize = false;
    this.width = 100;
}

function normalizeColor(color) {
    
    if (color.toLowerCase() === "green") {
        return "rgba(50, 172, 45, 0.97)";
    } else if (color.toLowerCase() === "orange") {
        return "rgba(237, 129, 40, 0.89)";
    } else if (color.toLowerCase() === "red") {
        return "rgba(245, 54, 54, 0.9)";
    } else { return color.toLowerCase(); }
};

ImageItCtrl.templateUrl = 'module.html';
