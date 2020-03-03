"use strict";

System.register(["lodash", "app/plugins/sdk", "./libs/interact", "app/core/utils/kbn"], function (_export, _context) {
  "use strict";

  var _, MetricsPanelCtrl, kbn, panelDefaults, mappingOperators, isTheFirstRender, ImageItCtrl;

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function isEqualTo(a, b) {
    // Could be ok if Im comparing strings and numbers
    // eslint-disable-next-line eqeqeq
    return a !== undefined && b !== undefined ? a == b : false;
  }

  function isGreaterThan(a, b) {
    return a !== undefined && b !== undefined ? a > b : false;
  }

  function isLessThan(a, b) {
    return a !== undefined && b !== undefined ? a < b : false;
  }

  function _getMappingOperators() {
    return mappingOperators;
  }

  function getRandomId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  function ValueColorMapping() {
    // TODO: check if it doesnt exist yet
    this.id = getRandomId();
    this.name = undefined;
    this.operatorName = mappingOperators[0].name;
    this.compareTo = undefined;
    this.isSensorFontBold = false;
    this.fontColor = '#000';
    this.bgColor = '#fff';
    this.nameBlink = false;
    this.valueBlink = false;
    this.bgBlink = false;
  }

  function Sensor() {
    this.metric = '';
    this.xlocation = 50;
    this.ylocation = 25;
    this.bgColor = 'rgba(64,64,64,1.000)';
    this.fontColor = 'rgba(255,255,255,1.000)';
    this.size = 14;
    this.visible = true;
    this.renderValue = true;
    this.valueFormatted = '';
    this.valueUnit = '';
    this.displayName = '';
    this.link_url = '';
    this.resolvedLink = '';
    this.rectangular = true;
    this.valueMappingIds = [];
    this.isBold = false;
    this.id = getRandomId();
    this.unitFormat = 'none';
    this.decimals = 2;
    this.sizeCoefficient = undefined;
  }

  function normalizeColor(color) {
    if (color.toLowerCase() === 'green') {
      return 'rgba(50, 172, 45, 0.97)';
    }

    if (color.toLowerCase() === 'orange') {
      return 'rgba(237, 129, 40, 0.89)';
    }

    if (color.toLowerCase() === 'red') {
      return 'rgba(245, 54, 54, 0.9)';
    }

    return color.toLowerCase();
  }

  return {
    setters: [function (_lodash) {
      _ = _lodash.default;
    }, function (_appPluginsSdk) {
      MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
    }, function (_libsInteract) {}, function (_appCoreUtilsKbn) {
      kbn = _appCoreUtilsKbn.default;
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
        realbgimage: '',
        sensors: [],
        templateSrv: null,
        sizecoefficient: 20,
        // uncache is a random number added to the img url to refresh it
        uncache: 0,
        islocked: false,
        islockvisible: true
      };
      mappingOperators = [{
        name: 'equal',
        operator: '=',
        fn: isEqualTo
      }, {
        name: 'greaterThan',
        operator: '>',
        fn: isGreaterThan
      }, {
        name: 'lessThan',
        operator: '<',
        fn: isLessThan
      }];
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

            for (var series = 0; series < dataListLength; series += 1) {
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
            this.panel.sensors.push(new Sensor());
            this.render();
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
          key: "onInitEditMode",
          value: function onInitEditMode() {
            this.addEditorTab('Sensor', 'public/plugins/pierosavi-imageit-panel/editor.html', 2);
            this.addEditorTab('Value Mapping', 'public/plugins/pierosavi-imageit-panel/mappings.html', 3);
            this.unitFormats = kbn.getUnitFormats();
            this.render();
          }
        }, {
          key: "toggleBlock",
          value: function toggleBlock() {
            this.panel.islocked = !this.panel.islocked;
            this.render();
          }
        }, {
          key: "link",
          value: function link(scope, elem, attrs, ctrl) {
            var panelContainer = elem.find('.pierosavi-imageit-panel')[0];
            var image = panelContainer.querySelector('#imageit-image');
            var draggableElement = '#imageit_panel' + ctrl.panel.id + '_sensor';

            function render() {
              if (!ctrl.panel.sensors || ctrl.panel.bgimage === '') {
                return;
              } // Replace possible variables in image URL


              ctrl.panel.realbgimage = ctrl.templateSrv.replace(ctrl.panel.bgimage);
              var imageWidth = image.offsetWidth;
              var imageHeight = image.offsetHeight;

              var metricMap = _.keyBy(ctrl.panel.metricValues, function (value) {
                return value.name;
              });

              var valueMappingsMap = _.keyBy(ctrl.panel.valueMappings, function (mapping) {
                return mapping.id;
              });

              var mappingOperatorsMap = _.keyBy(mappingOperators, function (operator) {
                return operator.name;
              });

              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                for (var _iterator = ctrl.panel.sensors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  var sensor = _step.value;

                  _.defaults(sensor, new Sensor());

                  var sizeCoefficient = sensor.sizeCoefficient ? sensor.sizeCoefficient : ctrl.panel.sizecoefficient;
                  sensor.size = imageWidth * sizeCoefficient / 1600;
                  sensor.borderRadius = sensor.rectangular ? '5%' : '50%';
                  sensor.xlocationStr = sensor.xlocation * imageWidth / 100 + 'px';
                  sensor.ylocationStr = sensor.ylocation * imageHeight / 100 + 'px';

                  if (sensor.link_url !== undefined) {
                    sensor.resolvedLink = ctrl.templateSrv.replace(sensor.link_url);
                  }

                  if (sensor.displayName !== undefined) {
                    sensor.effectiveDisplayName = ctrl.templateSrv.replace(sensor.displayName);
                  } // We need to replace possible variables in the sensors name


                  var effectiveName = ctrl.templateSrv.replace(sensor.metric);
                  var metric = metricMap[effectiveName];
                  var metricValue = metric !== undefined ? metric.value : undefined; // update existing valueMappings

                  var _iteratorNormalCompletion2 = true;
                  var _didIteratorError2 = false;
                  var _iteratorError2 = undefined;

                  try {
                    for (var _iterator2 = ctrl.panel.valueMappings[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                      var _valueMapping = _step2.value;

                      if (_valueMapping.mappingOperatorName == null) {
                        _valueMapping.mappingOperatorName = mappingOperators[0].name;
                      }

                      if (_valueMapping.id == null) {
                        _valueMapping.id = getRandomId();
                      }
                    }
                  } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                        _iterator2["return"]();
                      }
                    } finally {
                      if (_didIteratorError2) {
                        throw _iteratorError2;
                      }
                    }
                  }

                  if (sensor.valueMappingIds === undefined) {
                    sensor.valueMappingIds = [];
                  }

                  if (sensor.valueMappingIds.length > 0) {
                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                      for (var _iterator3 = sensor.valueMappingIds[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var mappingId = _step3.value;
                        var valueMapping = valueMappingsMap[mappingId];

                        if (valueMapping === undefined) {
                          break;
                        }

                        var mappingOperator = mappingOperatorsMap[valueMapping.mappingOperatorName];

                        if (mappingOperator.fn(metricValue, valueMapping.compareTo)) {
                          sensor.realFontColor = valueMapping.fontColor;
                          sensor.realBgColor = valueMapping.bgColor;
                          sensor.nameBlink = valueMapping.nameBlink;
                          sensor.valueBlink = valueMapping.valueBlink;
                          sensor.bgBlink = valueMapping.bgBlink;
                          sensor.isBold = valueMapping.isSensorFontBold;
                          break;
                        } else {
                          normalizeSensor(sensor);
                        }
                      }
                    } catch (err) {
                      _didIteratorError3 = true;
                      _iteratorError3 = err;
                    } finally {
                      try {
                        if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                          _iterator3["return"]();
                        }
                      } finally {
                        if (_didIteratorError3) {
                          throw _iteratorError3;
                        }
                      }
                    }
                  } else {
                    normalizeSensor(sensor);
                  }

                  if (metricValue === undefined) {
                    sensor.valueFormatted = 'Select a sensor metric';
                  } else {
                    var formatFunc = kbn.valueFormats[sensor.unitFormat];
                    sensor.valueFormatted = formatFunc(metricValue, sensor.decimals);
                  }
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                    _iterator["return"]();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }

              dragEventSetup();
            }

            function normalizeSensor(sensor) {
              // new sensor property so it doesn't lose the original one
              // https://github.com/pierosavi/pierosavi-imageit-panel/issues/4
              sensor.realBgColor = sensor.bgColor;
              sensor.realFontColor = sensor.fontColor;
              sensor.nameBlink = false;
              sensor.valueBlink = false;
              sensor.bgBlink = false;
              sensor.isBold = false;
            }

            function dragEventSetup() {
              if (ctrl.panel.islocked) {
                if (window.interact.isSet(draggableElement)) {
                  window.interact(draggableElement).unset();
                }
              } else if (!window.interact.isSet(draggableElement)) {
                window.interact(draggableElement).draggable({
                  // I dont like it personally but this could be configurable in the future
                  inertia: false,
                  restrict: {
                    restriction: '#draggableparent',
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
                    var target = event.target; // keep the dragged position in the data-x/data-y attributes

                    var datax = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                    var datay = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy; // translate the element

                    var elementTransform = 'translate(' + datax + 'px, ' + datay + 'px)';
                    target.style.webkitTransform = elementTransform;
                    target.style.transform = elementTransform; // update the position attributes

                    target.setAttribute('data-x', datax);
                    target.setAttribute('data-y', datay);
                  },
                  onend: function onend(event) {
                    var target = event.target;
                    var imageHeight = image.offsetHeight;
                    var imageWidth = image.offsetWidth; // find sensor with the id from the refId attribute on html

                    var sensor = _.find(ctrl.panel.sensors, {
                      'id': event.target.getAttribute('refId')
                    }); // get relative distance in px


                    var datax = target.getAttribute('data-x');
                    var datay = target.getAttribute('data-y'); // get percentage of relative distance from starting point

                    var xpercentage = datax * 100 / imageWidth;
                    var ypercentage = datay * 100 / imageHeight;
                    sensor.xlocation += xpercentage;
                    sensor.ylocation += ypercentage; // reset the starting sensor points

                    target.setAttribute('data-x', 0);
                    target.setAttribute('data-y', 0); // target.style.webkitTransform = '';

                    target.style.transform = '';
                    target.style.left = sensor.xlocation * imageWidth / 100 + 'px';
                    target.style.top = sensor.ylocation * imageHeight / 100 + 'px';
                  }
                });
              }
            }

            this.events.on('render', function () {
              render();
              ctrl.renderingCompleted();
            });
          } //------------------
          // Mapping stuff
          //------------------

        }, {
          key: "addValueMappingMap",
          value: function addValueMappingMap() {
            this.panel.valueMappings.push(new ValueColorMapping());
          }
        }, {
          key: "removeValueMappingMap",
          value: function removeValueMappingMap(index) {
            this.panel.valueMappings.splice(index, 1);
            this.render();
          }
        }, {
          key: "replaceTokens",
          value: function replaceTokens(originalValue) {
            var value = originalValue;

            if (!value) {
              return value;
            }

            value += '';
            value = value.split(' ').map(function (a) {
              if (a.startsWith('_fa-') && a.endsWith('_')) {
                var icon = a.replace(/_/g, '').split(',')[0];
                var color = a.indexOf(',') > -1 ? " style=\"color:".concat(normalizeColor(a.replace(/_/g, '').split(',')[1]), "\" ") : '';
                var repeatCount = a.split(',').length > 2 ? +a.replace(/_/g, '').split(',')[2] : 1;
                a = "<i class=\"fa ".concat(icon, "\" ").concat(color, "></i> ").repeat(repeatCount);
              } else if (a.startsWith('_img-') && a.endsWith('_')) {
                a = a.slice(0, -1);
                var imgUrl = a.replace('_img-', '').split(',')[0];
                var imgWidth = a.split(',').length > 1 ? a.replace('_img-', '').split(',')[1] : '20px';
                var imgHeight = a.split(',').length > 2 ? a.replace('_img-', '').split(',')[2] : '20px';

                var _repeatCount = a.split(',').length > 3 ? +a.replace('_img-', '').split(',')[3] : 1;

                a = "<img width=\"".concat(imgWidth, "\" height=\"").concat(imgHeight, "\" src=\"").concat(imgUrl, "\"/>").repeat(_repeatCount);
              }

              return a;
            }).join(' ');
            return this.$sce.trustAsHtml(value);
          }
        }, {
          key: "getMappingOperators",
          value: function getMappingOperators() {
            return _getMappingOperators();
          }
        }, {
          key: "setUnitFormat",
          value: function setUnitFormat(sensor, subItem) {
            sensor.unitFormat = subItem.value;
            this.render();
          }
        }, {
          key: "setBackgroundImage",
          value: function setBackgroundImage() {
            this.panel.realbgimage = this.templateSrv.replace(this.panel.bgimage);
            this.render();
          }
        }]);

        return ImageItCtrl;
      }(MetricsPanelCtrl));

      ImageItCtrl.templateUrl = 'module.html';
    }
  };
});
//# sourceMappingURL=imageit_ctrl.js.map
