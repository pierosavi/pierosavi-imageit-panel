"use strict";

System.register(["lodash", "app/plugins/sdk", "./sprintf.js", "./angular-sprintf.js", "./stringwidth/strwidth.js", "./libs/interact"], function (_export, _context) {
  "use strict";

  var _, MetricsPanelCtrl, getWidth, interact, panelDefaults, isTheFirstRender, ImageItCtrl;

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function getRandomId() {
    return '_' + Math.random().toString(36).substr(2, 9);
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

  function Sensor(metric, xlocation, ylocation, format, bgColor, fontColor, size, visible) {
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
    this.id = getRandomId();
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
    } else {
      return color.toLowerCase();
    }
  }

  return {
    setters: [function (_lodash) {
      _ = _lodash.default;
    }, function (_appPluginsSdk) {
      MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
    }, function (_sprintfJs) {}, function (_angularSprintfJs) {}, function (_stringwidthStrwidthJs) {
      getWidth = _stringwidthStrwidthJs.default;
    }, function (_libsInteract) {
      interact = _libsInteract.default;
    }],
    execute: function () {
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
        templateSrv: null,
        sizecoefficient: 20,
        //uncache is a random number added to the img url to refresh it
        uncache: 0
      };
      isTheFirstRender = true;

      _export("ImageItCtrl", ImageItCtrl =
      /*#__PURE__*/
      function (_MetricsPanelCtrl) {
        _inherits(ImageItCtrl, _MetricsPanelCtrl);

        function ImageItCtrl($scope, $injector, $sce, templateSrv) {
          var _this;

          _classCallCheck(this, ImageItCtrl);

          _this = _possibleConstructorReturn(this, _getPrototypeOf(ImageItCtrl).call(this, $scope, $injector));

          _.defaults(_this.panel, panelDefaults);

          _this.templateSrv = templateSrv;
          _this.$sce = $sce;

          _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_assertThisInitialized(_this)));

          _this.events.on('panel-initialized', _this.render.bind(_assertThisInitialized(_this)));

          _this.events.on('data-received', _this.onDataReceived.bind(_assertThisInitialized(_this)));

          _this.events.on('data-snapshot-load', _this.onDataReceived.bind(_assertThisInitialized(_this)));

          return _this;
        }

        _createClass(ImageItCtrl, [{
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

            if (!isTheFirstRender) {
              this.refreshImage();
            } else {
              isTheFirstRender = false;
            }

            this.render();
          }
        }, {
          key: "refreshImage",
          value: function refreshImage() {
            this.panel.uncache = Math.random();
          }
        }, {
          key: "deleteSensor",
          value: function deleteSensor(index) {
            this.panel.sensors.splice(index, 1);
          }
        }, {
          key: "addSensor",
          value: function addSensor() {
            this.panel.sensors.push(new Sensor('A', 50, 25, '%.2f', 'rgba(64,64,64,1.000)', 'rgba(255,255,255,1.000)', 14, true));
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
            this.panel.groups.push(new Group('A', "left", 50, 50));
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
            this.addEditorTab('Sensor', 'public/plugins/pierosavi-imageit-panel/editor.html', 2);
            this.addEditorTab('Color Mapping', 'public/plugins/pierosavi-imageit-panel/colors.html', 3);
            this.addEditorTab('Value Mapping', 'public/plugins/pierosavi-imageit-panel/mappings.html', 4);
          }
        }, {
          key: "link",
          value: function link(scope, elem, attrs, ctrl) {
            var panelContainer = elem.find('.pierosavi-imageit-panel')[0];
            var image = panelContainer.querySelector('#imageit-image');

            function getGroup(name) {
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                for (var _iterator = ctrl.panel.groups[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  var _group = _step.value;

                  if (_group.name == name) {
                    return _group;
                  }
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator.return != null) {
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

                  if (!sensor.hasOwnProperty('id')) {
                    sensor.id = getRandomId();
                  }

                  if (image != null) {
                    var imageWidth = image.offsetWidth;
                    sensor.size = imageWidth * ctrl.panel.sizecoefficient / 1600;
                  }

                  var sensorWidth = getWidth(sensor.displayName, {
                    font: 'Arial',
                    size: sensor.size
                  }) + 20;

                  if (ctrl.panel.useLabelGroupings) {
                    var _group2 = getGroup(sensor.group.name);

                    if (_group2 != null && _group2.sameSize) {
                      var newValue = Math.max(_group2.width, sensorWidth);
                      _group2.width = newValue;
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
                  if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
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
                    var _group3 = getGroup(_sensor.group.name);

                    if (_group3 != null) {
                      _sensor.panelWidth = _group3.width + "px";
                      _sensor.width = _group3.width;
                    }
                  }

                  if (!ctrl.panel.useLabelGroupings) {
                    _sensor.ylocationStr = _sensor.ylocation.toString() + "px";
                    _sensor.xlocationStr = _sensor.xlocation.toString() + "px";
                  } else {
                    alignSensors();
                  }

                  _sensor.sizeStr = _sensor.size.toString() + "px";

                  if (_sensor.rectangular) {
                    _sensor.borderRadius = '5%';
                  } else {
                    _sensor.borderRadius = '50%';
                  }

                  if (_sensor.link_url != undefined) {
                    _sensor.resolvedLink = ctrl.templateSrv.replace(_sensor.link_url);
                  } //We need to replace possible variables in the sensors name


                  var effectiveName = ctrl.templateSrv.replace(_sensor.metric);
                  var mValue = metricMap[effectiveName];

                  if (mValue === undefined) {
                    mValue = {
                      name: "dummy",
                      value: 'null'
                    };
                  }

                  var valueMapping = valueMappingsMap[mValue.value];

                  if (valueMapping !== undefined) {
                    var colorMapping = ctrl.panel.colorMappingMap[valueMapping.colorName];

                    if (colorMapping !== undefined) {
                      _sensor.realBgColor = colorMapping.color;
                    }
                  } else {
                    // new sensor property so it doesn't lose the original one 
                    // https://github.com/pierosavi/pierosavi-imageit-panel/issues/4
                    _sensor.realBgColor = _sensor.bgColor;
                  } //finally format the value itself


                  _sensor.valueFormatted = sprintf(_sensor.format, mValue.value);
                }
              } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                    _iterator3.return();
                  }
                } finally {
                  if (_didIteratorError3) {
                    throw _iteratorError3;
                  }
                }
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
                  elementRect: {
                    top: 0,
                    left: 0,
                    bottom: 1,
                    right: 1
                  }
                },
                autoScroll: true,
                onmove: function onmove(event) {
                  var target = event.target,
                      // keep the dragged position in the data-x/data-y attributes
                  x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy; // translate the element

                  target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'; // update the position attributes

                  target.setAttribute('data-x', x);
                  target.setAttribute('data-y', y);
                },
                onend: function onend(event) {
                  var target = event.target;
                  var imageHeight = image.offsetHeight;
                  var imageWidth = image.offsetWidth;
                  var x = target.getAttribute('data-x');
                  var y = target.getAttribute('data-y'); // get percentage of relative distance from starting point 

                  var xpercentage = x * 100 / imageWidth;
                  var ypercentage = y * 100 / imageHeight; // browsers dont render more than 4 decimals so better cut away the others

                  var newX = parseInt(target.style.left) + xpercentage;
                  newX = Math.round(newX * 10000) / 10000;
                  var newY = parseInt(target.style.top) + ypercentage;
                  newY = Math.round(newY * 10000) / 10000;
                  target.style.webkitTransform = target.style.transform = 'translate(0px, 0px)'; // manually set the new style so I don't need to render() again

                  target.style.left = newX + '%';
                  target.style.top = newY + '%'; // really update the sensor values
                  //find sensor with the id from the refId attribute on html

                  var sensor = _.find(ctrl.panel.sensors, {
                    'id': event.target.getAttribute('refId')
                  });

                  sensor.xlocation = newX;
                  sensor.ylocation = newY; // reset the starting sensor points

                  target.setAttribute('data-x', 0);
                  target.setAttribute('data-y', 0);
                }
              });
            }

            function alignSensors() {
              var _iteratorNormalCompletion4 = true;
              var _didIteratorError4 = false;
              var _iteratorError4 = undefined;

              try {
                for (var _iterator4 = ctrl.panel.groups[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                  var _group4 = _step4.value;
                  _group4.nextTop = undefined;
                  _group4.nextX = undefined;
                }
              } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
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

                  var _group5 = getGroup(sensor.group.name);

                  if (_group5.alignment == "left") {
                    if (_group5.nextTop === undefined) {
                      _group5.nextTop = _group5.y;
                    }

                    sensor.ylocationStr = _group5.nextTop + "px";
                    sensor.xlocationStr = _group5.x + "px";
                    _group5.nextTop = _group5.nextTop + sensorHeight;
                  } else if (_group5.alignment == "middle") {
                    if (_group5.nextTop === undefined) {
                      _group5.nextTop = _group5.y;
                    }

                    sensor.ylocationStr = _group5.nextTop + "px";

                    if (_group5.sameSize) {
                      sensor.xlocationStr = _group5.x - _group5.width / 2 + "px";
                    } else {
                      sensor.xlocationStr = _group5.x - sensor.width / 2 + "px";
                    }

                    _group5.nextTop = _group5.nextTop + sensorHeight;
                  } else if (_group5.alignment == "right") {
                    if (_group5.nextTop === undefined) {
                      _group5.nextTop = _group5.y;
                    }

                    sensor.ylocationStr = _group5.nextTop + "px";

                    if (_group5.sameSize) {
                      sensor.xlocationStr = _group5.x - _group5.width + "px";
                    } else {
                      sensor.xlocationStr = _group5.x - sensor.width + "px";
                    }

                    _group5.nextTop = _group5.nextTop + sensorHeight;
                  } else if (_group5.alignment == "top") {
                    if (_group5.nextX === undefined) {
                      _group5.nextX = _group5.x;
                    }

                    sensor.xlocationStr = _group5.nextX + "px";
                    sensor.ylocationStr = _group5.y + "px";
                    _group5.nextX = _group5.nextX + sensorWidth;
                  }
                }
              } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
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
          } //------------------
          // Color mapping stuff
          //------------------

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
          } //------------------
          // Mapping stuff
          //------------------

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
        }, {
          key: "replaceTokens",
          value: function replaceTokens(value) {
            if (!value) {
              return value;
            }

            value = value + "";
            value = value.split(" ").map(function (a) {
              if (a.startsWith("_fa-") && a.endsWith("_")) {
                var icon = a.replace(/\_/g, "").split(",")[0];
                var color = a.indexOf(",") > -1 ? " style=\"color:".concat(normalizeColor(a.replace(/\_/g, "").split(",")[1]), "\" ") : "";
                var repeatCount = a.split(",").length > 2 ? +a.replace(/\_/g, "").split(",")[2] : 1;
                a = "<i class=\"fa ".concat(icon, "\" ").concat(color, "></i> ").repeat(repeatCount);
              } else if (a.startsWith("_img-") && a.endsWith("_")) {
                a = a.slice(0, -1);
                var imgUrl = a.replace("_img-", "").split(",")[0];
                var imgWidth = a.split(",").length > 1 ? a.replace("_img-", "").split(",")[1] : "20px";
                var imgHeight = a.split(",").length > 2 ? a.replace("_img-", "").split(",")[2] : "20px";

                var _repeatCount = a.split(",").length > 3 ? +a.replace("_img-", "").split(",")[3] : 1;

                a = "<img width=\"".concat(imgWidth, "\" height=\"").concat(imgHeight, "\" src=\"").concat(imgUrl, "\"/>").repeat(_repeatCount);
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

        }]);

        return ImageItCtrl;
      }(MetricsPanelCtrl));

      ;
      ;
      ImageItCtrl.templateUrl = 'module.html';
    }
  };
});
//# sourceMappingURL=imageit_ctrl.js.map
