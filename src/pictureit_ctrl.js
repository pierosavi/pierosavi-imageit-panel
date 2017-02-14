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
	height: '400px'
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
		this.panel.sensors.push({name: 'A-series', xlocation: '200px',ylocation: '200px',format: '%.2f',bgcolor:'rgba(0, 0, 0, 0.58)',color:'#FFFFFF',size:'22px', bordercolor:'rgb(251, 4, 4)'});
	else {
		var lastSensor=this.panel.sensors[this.panel.sensors.length-1];
	
		this.panel.sensors.push({name: lastSensor.name, xlocation: '200px',ylocation: '200px',format: lastSensor.format,bgcolor:lastSensor.bgcolor,color:lastSensor.color,size:lastSensor.size, bordercolor:lastSensor.bordercolor});
	}
  }
  
  onInitEditMode() {
    this.addEditorTab('Options', 'public/plugins/grafana-pictureit/editor.html', 2);
  }
	
  link(scope, elem, attrs, ctrl) {
    var sensors;
	var valueMaps;

    function render() {
      if (!ctrl.panel.sensors) { return; }
	  
      sensors = ctrl.panel.sensors;	  
	  valueMaps = ctrl.panel.valueMaps;
	  
	  var sensorsLength = sensors.length;
	  var valueMapsLength = valueMaps.length;
	  
	  for (var sensor=0;sensor<sensorsLength;sensor++) {
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
