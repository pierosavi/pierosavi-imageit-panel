"use strict";

System.register(["lodash", "app/plugins/sdk", "./sprintf.js", "./angular-sprintf.js", "./stringwidth/strwidth.js"], function (_export, _context) {
    "use strict";

    var _, MetricsPanelCtrl, getWidth, _createClass, panelDefaults, PictureItCtrl;

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

    function ValueColorMapping(value, colorName) {
        'use strict';

        this.value = value;
        this.colorName = colorName;
    }

    function ColorMapping(name, color) {
        'use strict';

        this.name = name;
        this.color = color;
    }

    function Sensor(metric, xlocation, ylocation, format, bgcolor, fontColor, size, bordercolor, visible) {
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
        this.link_url = '';
        this.resolvedLink = '';
        this.rectangular = true;
        this.group = 'A';
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
    return {
        setters: [function (_lodash) {
            _ = _lodash.default;
        }, function (_appPluginsSdk) {
            MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
        }, function (_sprintfJs) {}, function (_angularSprintfJs) {}, function (_stringwidthStrwidthJs) {
            getWidth = _stringwidthStrwidthJs.default;
        }],
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
                templateSrv: null
            };

            _export("PictureItCtrl", PictureItCtrl = function (_MetricsPanelCtrl) {
                _inherits(PictureItCtrl, _MetricsPanelCtrl);

                function PictureItCtrl($scope, $injector, templateSrv) {
                    _classCallCheck(this, PictureItCtrl);

                    var _this = _possibleConstructorReturn(this, (PictureItCtrl.__proto__ || Object.getPrototypeOf(PictureItCtrl)).call(this, $scope, $injector));

                    _.defaults(_this.panel, panelDefaults);
                    _this.templateSrv = templateSrv;
                    _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
                    _this.events.on('panel-initialized', _this.render.bind(_this));
                    _this.events.on('data-received', _this.onDataReceived.bind(_this));
                    _this.events.on('data-snapshot-load', _this.onDataReceived.bind(_this));
                    return _this;
                }

                _createClass(PictureItCtrl, [{
                    key: "onDataReceived",
                    value: function onDataReceived(dataList) {
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
                }, {
                    key: "deleteSensor",
                    value: function deleteSensor(index) {
                        this.panel.sensors.splice(index, 1);
                    }
                }, {
                    key: "addSensor",
                    value: function addSensor() {
                        if (this.panel.sensors.length === 0) {
                            this.panel.sensors.push(new Sensor('A', 50, 25, '%.2f', 'rgba(0, 0, 0, 0.58)', '#000000', 14, 'rgb(251, 4, 4)', true));
                        } else {
                            var lastSensor = this.panel.sensors[this.panel.sensors.length - 1];
                            this.panel.sensors.push(new Sensor(lastSensor.metric, 50, 25, lastSensor.format, lastSensor.bgcolor, lastSensor.color, lastSensor.size, lastSensor.bordercolor, true));
                        }
                    }
                }, {
                    key: "moveSensorUp",
                    value: function moveSensorUp(index) {
                        var sensor = this.panel.sensors[index];
                        this.panel.sensors.splice(index, 1);
                        this.panel.sensors.splice(index - 1, 0, sensor);
                    }
                }, {
                    key: "moveSensorDown",
                    value: function moveSensorDown(index) {
                        var sensor = this.panel.sensors[index];
                        this.panel.sensors.splice(index, 1);
                        this.panel.sensors.splice(index + 1, 0, sensor);
                    }
                }, {
                    key: "deleteGroup",
                    value: function deleteGroup(index) {
                        this.panel.groups.splice(index, 1);
                    }
                }, {
                    key: "addGroup",
                    value: function addGroup() {
                        this.panel.groups.push(new Group('A', "left", 200, 200));
                    }
                }, {
                    key: "getAvailableGroups",
                    value: function getAvailableGroups() {

                        var result = ctrl.panel.groups.map(function (g) {
                            return g.name;
                        });
                        alert("RESULT: " + JSON.stringify(result));
                        return result;
                    }
                }, {
                    key: "onInitEditMode",
                    value: function onInitEditMode() {
                        this.addEditorTab('Sensor', 'public/plugins/bessler-pictureit-panel/editor.html', 2);
                        this.addEditorTab('Color Mapping', 'public/plugins/bessler-pictureit-panel/colors.html', 3);
                        this.addEditorTab('Value Color Mapping', 'public/plugins/bessler-pictureit-panel/mappings.html', 4);
                    }
                }, {
                    key: "link",
                    value: function link(scope, elem, attrs, ctrl) {
                        var $panelContainer = elem.find('.panel-container');

                        function pixelStrToNum(str) {
                            return parseInt(str.substr(0, str.length - 2));
                        }

                        function getGroup(name) {
                            var _iteratorNormalCompletion = true;
                            var _didIteratorError = false;
                            var _iteratorError = undefined;

                            try {
                                for (var _iterator = ctrl.panel.groups[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                    var group = _step.value;

                                    if (group.name == name) {
                                        return group;
                                    }
                                }
                            } catch (err) {
                                _didIteratorError = true;
                                _iteratorError = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion && _iterator.return) {
                                        _iterator.return();
                                    }
                                } finally {
                                    if (_didIteratorError) {
                                        throw _iteratorError;
                                    }
                                }
                            }

                            return null;
                        }

                        function render() {
                            if (!ctrl.panel.sensors) {
                                return;
                            }
                            var width = pixelStrToNum($panelContainer.css("width"));
                            var height = pixelStrToNum($panelContainer.css("height"));
                            var metricMap = _.keyBy(ctrl.panel.metricValues, function (value) {
                                return value.name;
                            });
                            var valueMappingsMap = _.keyBy(ctrl.panel.valueMappings, function (mapping) {
                                return mapping.value;
                            });

                            var _iteratorNormalCompletion2 = true;
                            var _didIteratorError2 = false;
                            var _iteratorError2 = undefined;

                            try {
                                for (var _iterator2 = ctrl.panel.sensors[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                    var sensor = _step2.value;

                                    var sensorWidth = getWidth(sensor.displayName, { font: 'Arial', size: sensor.size }) + 20;
                                    if (ctrl.panel.useLabelGroupings) {
                                        var group = getGroup(sensor.group.name);
                                        if (group != null && group.sameSize) {
                                            var newValue = Math.max(group.width, sensorWidth);
                                            group.width = newValue;
                                            sensor.width = newValue;
                                        } else {
                                            sensor.panelWidth = sensorWidth + "px";
                                            sensor.width = sensorWidth;
                                        }
                                    } else {
                                        sensor.panelWidth = sensorWidth + "px";
                                        sensor.width = sensorWidth;
                                    }
                                }
                            } catch (err) {
                                _didIteratorError2 = true;
                                _iteratorError2 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                        _iterator2.return();
                                    }
                                } finally {
                                    if (_didIteratorError2) {
                                        throw _iteratorError2;
                                    }
                                }
                            }

                            var _iteratorNormalCompletion3 = true;
                            var _didIteratorError3 = false;
                            var _iteratorError3 = undefined;

                            try {
                                for (var _iterator3 = ctrl.panel.sensors[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                    var _sensor = _step3.value;

                                    if (ctrl.panel.useLabelGroupings && group.sameSize) {
                                        var group = getGroup(_sensor.group.name);
                                        if (group != null) {
                                            _sensor.panelWidth = group.width + "px";
                                            _sensor.width = group.width;
                                        }
                                    }
                                    _sensor.visible = _sensor.xlocation < width && _sensor.ylocation < height;
                                    if (!ctrl.panel.useLabelGroupings) {
                                        _sensor.ylocationStr = _sensor.ylocation.toString() + "px";
                                        _sensor.xlocationStr = _sensor.xlocation.toString() + "px";
                                    } else {
                                        alignSensors();
                                    }
                                    _sensor.sizeStr = _sensor.size.toString() + "px";
                                    _sensor.bgcolor = 'rgb(64, 64, 64)';
                                    _sensor.bordercolor = 'rgb(64, 64, 64)';

                                    if (_sensor.rectangular) {
                                        _sensor.borderRadius = '5%';
                                    } else {
                                        _sensor.borderRadius = '50%';
                                    }

                                    if (_sensor.link_url != undefined) {
                                        _sensor.resolvedLink = ctrl.templateSrv.replace(_sensor.link_url);
                                    }

                                    //We need to replace possible variables in the sensors name
                                    var effectiveName = ctrl.templateSrv.replace(_sensor.metric);

                                    var mValue = metricMap[effectiveName];
                                    if (mValue === undefined) {
                                        mValue = { name: "dummy", value: 'null' };
                                    }

                                    var valueMapping = valueMappingsMap[mValue.value];

                                    if (valueMapping !== undefined) {
                                        var colorMapping = ctrl.panel.colorMappingMap[valueMapping.colorName];
                                        if (colorMapping !== undefined) {
                                            _sensor.bgcolor = colorMapping.color;
                                            _sensor.bordercolor = colorMapping.color;
                                        }
                                    }

                                    //finally format the value itself
                                    _sensor.valueFormatted = sprintf(_sensor.format, mValue.value);
                                }
                            } catch (err) {
                                _didIteratorError3 = true;
                                _iteratorError3 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                        _iterator3.return();
                                    }
                                } finally {
                                    if (_didIteratorError3) {
                                        throw _iteratorError3;
                                    }
                                }
                            }
                        }

                        function alignSensors() {
                            var _iteratorNormalCompletion4 = true;
                            var _didIteratorError4 = false;
                            var _iteratorError4 = undefined;

                            try {
                                for (var _iterator4 = ctrl.panel.groups[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                    var _group = _step4.value;

                                    _group.nextTop = undefined;
                                    _group.nextX = undefined;
                                }
                            } catch (err) {
                                _didIteratorError4 = true;
                                _iteratorError4 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                        _iterator4.return();
                                    }
                                } finally {
                                    if (_didIteratorError4) {
                                        throw _iteratorError4;
                                    }
                                }
                            }

                            var _iteratorNormalCompletion5 = true;
                            var _didIteratorError5 = false;
                            var _iteratorError5 = undefined;

                            try {
                                for (var _iterator5 = ctrl.panel.sensors[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                    var sensor = _step5.value;

                                    var sensorHeight = sensor.size + 30;
                                    var sensorWidth = sensor.width + 10;
                                    var group = getGroup(sensor.group.name);
                                    if (group.alignment == "left") {
                                        if (group.nextTop === undefined) {
                                            group.nextTop = group.y;
                                        }
                                        sensor.ylocationStr = group.nextTop + "px";
                                        sensor.xlocationStr = group.x + "px";
                                        group.nextTop = group.nextTop + sensorHeight;
                                    } else if (group.alignment == "middle") {
                                        if (group.nextTop === undefined) {
                                            group.nextTop = group.y;
                                        }
                                        sensor.ylocationStr = group.nextTop + "px";
                                        if (group.sameSize) {
                                            sensor.xlocationStr = group.x - group.width / 2 + "px";
                                        } else {
                                            sensor.xlocationStr = group.x - sensor.width / 2 + "px";
                                        }
                                        group.nextTop = group.nextTop + sensorHeight;
                                    } else if (group.alignment == "right") {
                                        if (group.nextTop === undefined) {
                                            group.nextTop = group.y;
                                        }
                                        sensor.ylocationStr = group.nextTop + "px";
                                        if (group.sameSize) {
                                            sensor.xlocationStr = group.x - group.width + "px";
                                        } else {
                                            sensor.xlocationStr = group.x - sensor.width + "px";
                                        }
                                        group.nextTop = group.nextTop + sensorHeight;
                                    } else if (group.alignment == "top") {
                                        if (group.nextX === undefined) {
                                            group.nextX = group.x;
                                        }
                                        sensor.xlocationStr = group.nextX + "px";
                                        sensor.ylocationStr = group.y + "px";
                                        group.nextX = group.nextX + sensorWidth;
                                    }
                                }
                            } catch (err) {
                                _didIteratorError5 = true;
                                _iteratorError5 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                        _iterator5.return();
                                    }
                                } finally {
                                    if (_didIteratorError5) {
                                        throw _iteratorError5;
                                    }
                                }
                            }
                        }

                        this.events.on('render', function () {
                            render();
                            ctrl.renderingCompleted();
                        });
                    }
                }, {
                    key: "addColorMapping",
                    value: function addColorMapping() {
                        this.panel.colorMappings.push(new ColorMapping('name', '#FFFFFF'));
                        this.refreshColorMappings();
                    }
                }, {
                    key: "removeColorMapping",
                    value: function removeColorMapping(map) {
                        var index = _.indexOf(this.panel.colorMappings, map);
                        this.panel.colorMappings.splice(index, 1);
                        this.refreshColorMappings();
                    }
                }, {
                    key: "refreshColorMappings",
                    value: function refreshColorMappings() {
                        this.panel.colorMappingMap = _.keyBy(this.panel.colorMappings, function (mapping) {
                            return mapping.name;
                        });
                        this.render();
                    }
                }, {
                    key: "addValueMappingMap",
                    value: function addValueMappingMap() {
                        this.panel.valueMappings.push(new ValueColorMapping('value', ''));
                    }
                }, {
                    key: "removeValueMappingMap",
                    value: function removeValueMappingMap(toRemove) {
                        var index = _.indexOf(this.panel.valueMappings, toRemove);
                        this.panel.valueMappings.splice(index, 1);
                        this.render();
                    }
                }]);

                return PictureItCtrl;
            }(MetricsPanelCtrl));

            _export("PictureItCtrl", PictureItCtrl);

            PictureItCtrl.templateUrl = 'module.html';
        }
    };
});
//# sourceMappingURL=pictureit_ctrl.js.map
