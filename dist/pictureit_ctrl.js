'use strict';

System.register(['lodash', 'app/plugins/sdk', './sprintf.js', './angular-sprintf.js'], function (_export, _context) {
	"use strict";

	var _, MetricsPanelCtrl, _createClass, panelDefaults, PictureItCtrl;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	return {
		setters: [function (_lodash) {
			_ = _lodash.default;
		}, function (_appPluginsSdk) {
			MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
		}, function (_sprintfJs) {}, function (_angularSprintfJs) {}],
		execute: function () {
			_createClass = function () {
				function defineProperties(target, props) {
					for (var i = 0; i < props.length; i++) {
						var descriptor = props[i];
						descriptor.enumerable = descriptor.enumerable || false;
						descriptor.configurable = true;
						if ("value" in descriptor) descriptor.writable = true;
						Object.defineProperty(target, descriptor.key, descriptor);
					}
				}

				return function (Constructor, protoProps, staticProps) {
					if (protoProps) defineProperties(Constructor.prototype, protoProps);
					if (staticProps) defineProperties(Constructor, staticProps);
					return Constructor;
				};
			}();

			panelDefaults = {
				valueMaps: [],
				seriesList: [],
				series: [],
				bgimage: '',
				sensors: [],
				height: '400px',
				width: '100px'
			};

			_export('PictureItCtrl', PictureItCtrl = function (_MetricsPanelCtrl) {
				_inherits(PictureItCtrl, _MetricsPanelCtrl);

				function PictureItCtrl($scope, $injector) {
					_classCallCheck(this, PictureItCtrl);

					var _this = _possibleConstructorReturn(this, (PictureItCtrl.__proto__ || Object.getPrototypeOf(PictureItCtrl)).call(this, $scope, $injector));

					_.defaults(_this.panel, panelDefaults);

					_this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
					_this.events.on('panel-initialized', _this.render.bind(_this));
					_this.events.on('data-received', _this.onDataReceived.bind(_this));
					_this.events.on('data-snapshot-load', _this.onDataReceived.bind(_this));
					return _this;
				}

				_createClass(PictureItCtrl, [{
					key: 'onDataReceived',
					value: function onDataReceived(dataList) {
						var dataListLength = dataList.length;
						this.panel.valueMaps = [];
						for (var series = 0; series < dataListLength; series++) {
							this.panel.valueMaps.push({ name: dataList[series].target, value: dataList[series].datapoints[dataList[series].datapoints.length - 1][0] });
						}

						this.render();
					}
				}, {
					key: 'deleteSensor',
					value: function deleteSensor(index) {
						this.panel.sensors.splice(index, 1);
					}
				}, {
					key: 'addSensor',
					value: function addSensor() {
						if (this.panel.sensors.length == 0) this.panel.sensors.push({ name: 'A-series', xlocation: 200, ylocation: 200, format: '%.2f', bgcolor: 'rgba(0, 0, 0, 0.58)', color: '#FFFFFF', size: 22, bordercolor: 'rgb(251, 4, 4)', visible: true });else {
							var lastSensor = this.panel.sensors[this.panel.sensors.length - 1];

							this.panel.sensors.push({ name: lastSensor.name, xlocation: 200, ylocation: 200, format: lastSensor.format, bgcolor: lastSensor.bgcolor, color: lastSensor.color, size: lastSensor.size, bordercolor: lastSensor.bordercolor, visible: true });
						}
					}
				}, {
					key: 'onInitEditMode',
					value: function onInitEditMode() {
						this.addEditorTab('Options', 'public/plugins/bessler-pictureit-panel/editor.html', 2);
					}
				}, {
					key: 'link',
					value: function link(scope, elem, attrs, ctrl) {
						var sensors;
						var valueMaps;

						var $panelContainer = elem.find('.panel-container');

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
							valueMaps = ctrl.panel.valueMaps;

							var sensorsLength = sensors.length;
							var valueMapsLength = valueMaps.length;

							for (var sensor = 0; sensor < sensorsLength; sensor++) {
								sensors[sensor].visible = sensors[sensor].xlocation < width && sensors[sensor].ylocation < height;
								sensors[sensor].ylocationStr = sensors[sensor].ylocation.toString() + "px";
								sensors[sensor].xlocationStr = sensors[sensor].xlocation.toString() + "px";
								sensors[sensor].sizeStr = sensors[sensor].size.toString() + "px";
								for (var valueMap = 0; valueMap < valueMapsLength; valueMap++) {
									if (sensors[sensor].name == valueMaps[valueMap].name) {
										sensors[sensor].valueFormatted = sprintf(sensors[sensor].format, valueMaps[valueMap].value);
										break;
									}
								}
							}
						}

						this.events.on('render', function () {
							render();
							ctrl.renderingCompleted();
						});
					}
				}]);

				return PictureItCtrl;
			}(MetricsPanelCtrl));

			_export('PictureItCtrl', PictureItCtrl);

			PictureItCtrl.templateUrl = 'module.html';
		}
	};
});
//# sourceMappingURL=pictureit_ctrl.js.map
