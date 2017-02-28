import _ from 'lodash';
import {MetricsPanelCtrl} from 'app/plugins/sdk';
import './sprintf.js';
import './angular-sprintf.js';

const panelDefaults = {
	valueMaps: [],
	seriesList: [],
	series: [],
	bgimage: '',
	sensors: [],
	height: '400px',
	width: '100px'
};

export class PictureItCtrl extends MetricsPanelCtrl  {
  
  
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
	this.panel.valueMaps=[];
	for (var series=0;series<dataListLength;series++) {		
		this.panel.valueMaps.push({name:dataList[series].target,value:dataList[series].datapoints[dataList[series].datapoints.length-1][0]});
	}
	
    this.render();
  }
  
  deleteSensor(index) {
	this.panel.sensors.splice(index,1);
  }
  
  addSensor() {
	if (this.panel.sensors.length==0)
		this.panel.sensors.push({name: 'A-series', xlocation: 200,ylocation: 200,format: '%.2f',bgcolor:'rgba(0, 0, 0, 0.58)',color:'#FFFFFF',size:22, bordercolor:'rgb(251, 4, 4)',visible:true});
	else {
		var lastSensor=this.panel.sensors[this.panel.sensors.length-1];
	
		this.panel.sensors.push({name: lastSensor.name, xlocation: 200,ylocation: 200,format: lastSensor.format,bgcolor:lastSensor.bgcolor,color:lastSensor.color,size:lastSensor.size, bordercolor:lastSensor.bordercolor,visible:true});
	}
  }
  
  onInitEditMode() {
    this.addEditorTab('Options', 'public/plugins/bessler-pictureit-panel/editor.html', 2);
  }
	
  link(scope, elem, attrs, ctrl) {
    var sensors;
	var valueMaps;

	const $panelContainer = elem.find('.panel-container');

	function pixelStrToNum(str) {
		return parseInt(str.substr(0,str.length-2));
	}
	
    function render() {
      if (!ctrl.panel.sensors) { return; }
	  var width = pixelStrToNum($panelContainer.css("width"));
	  var height = pixelStrToNum($panelContainer.css("height"));
	  
      sensors = ctrl.panel.sensors;	  
	  valueMaps = ctrl.panel.valueMaps;
	  
	  var sensorsLength = sensors.length;
	  var valueMapsLength = valueMaps.length;
	  
	  for (var sensor=0;sensor<sensorsLength;sensor++) {
		sensors[sensor].visible = sensors[sensor].xlocation<width && sensors[sensor].ylocation<height;
		sensors[sensor].ylocationStr=sensors[sensor].ylocation.toString()+"px";
		sensors[sensor].xlocationStr=sensors[sensor].xlocation.toString()+"px";
		sensors[sensor].sizeStr=sensors[sensor].size.toString()+"px";
		for (var valueMap=0;valueMap<valueMapsLength;valueMap++) {	
			if (sensors[sensor].name==valueMaps[valueMap].name) {
				sensors[sensor].valueFormatted=sprintf(sensors[sensor].format,valueMaps[valueMap].value);
				break;
			}
		}
	  }
    }

    this.events.on('render', function() {
      render();
      ctrl.renderingCompleted();
    });
  }
}

PictureItCtrl.templateUrl = 'module.html';
