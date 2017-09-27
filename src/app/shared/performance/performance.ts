import {ITiming} from "./ITiming";
import {ITable} from "app/shared/performance/ITable";

export class Veyron {

  public static performance = () => {
    let _Performance = function() {
        let data = {
            basic: ["name", "initiatorType", "entryType", "duration", "workerStart"],
            timeline: ["startTime", "redirectStart", "redirectEnd", "fetchStart", "domainLookupStart", "domainLookupEnd", "connectStart", "secureConnectionStart", "connectEnd", "requestStart", "responseStart", "responseEnd"]
          },
          tables = [],
          _performance;

        function _supported() {
          let _is = (('performance' in window) && ('getEntriesByType' in window.performance));
          if (_is) {
            _performance = window.performance;
          }
          return _is;
        }

        function _measureCRP() {
          // resource: https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp?hl=en
          // dcl - dome content loaded
          let t = _performance.timing,
            interactive = t.domInteractive - t.domLoading,
            dcl = t.domContentLoadedEventStart - t.domLoading,
            complete = t.domComplete - t.domLoading;

          return {
            dcl: dcl,
            interactive: interactive,
            complete: complete,
            print: () =>{
              console.log(['Performance CRP:  interactive: ', interactive, 'ms, ', 'dcl: ', dcl, 'ms, complete: ', complete, 'ms'].join(""));
            }};
        }

        function _measureEnries() {
          let entries = _performance.getEntries();
          entries.forEach(function(entry) {
            console.log("Name: " + entry.name + " Entry Type: " + entry.entryType + " Start Time: " + entry.startTime + " Duration: " + entry.duration + "\n");
          });
        }

        function _markers() {
          let _module;
          _module = {

            infoAll: function(name, type) {
              return _performance.getEntries();
            },

            info: function(name, type) {
              return _performance.getEntriesByName(name, type);
            },
            mark: function(name) {
              return _performance.mark(name);
            },
            clearMarks: function() {
              _performance.clearMarks();
            },
            clearMark: function(name) {
              _performance.clearMark(name);
            },
            clearMeasure: function(name) {
              _performance.clearMeasure(name);
            },
            clearMeasures: function(name) {
              _performance.clearMeasures();
            },


            /**
             * Measure performance between two points
             *
             * @param name - The measure name
             * @param from - start point (@see mark method)
             * @param to   - end point - end mark will be added just before measuring if not taken
             */
            measure: function(from, to, name) {

              let _to = _module.info(to, "mark");
              if (_to.length === 0) {
                _module.mark(to);
              }
              name = (name || from);
              _performance.measure(name, from, to);


              let duration = _module.info(name, "measure")[0].duration;
              return {
                name: name,
                duration: duration,
                print: () => {
                  console.log(["performance for measure: ", name, " ", ].join(""));
                }
              };
            }
          };
          return _module;
        }

        function _resources() {
          let resources = _performance.getEntriesByType('resource');
          if (resources && resources.length > 0) {
            resources.forEach(function(resource) {
              let table = <ITable>{};
              data.timeline.forEach(function(item) {
                table[item] = {
                  value: resource[item]
                };
              });
              table.duration = {
                value: resource.duration
              };
              table.name = {
                value: resource.name
              };
              tables.push(table);
            });
          }
          return {
            measure: function() {
              return {
                tables: tables,
                print: () => {
                  tables.forEach(function(table) {
                    if (Object.keys(table).length > 0) {
                      console.log("Resource: ", table.name, " duration: ", table.duration.value + "ms");
                    }
                  });
                }

              };
            },
            data: function() {
              return resources;
            }
          };
        }

        function _timinginfo() {

          let key, _timing = <ITiming>{},
            timing = _performance.timing;

          for (key in timing) {
            if (timing.hasOwnProperty(key)) {
              _timing[key] = timing[key];
            }
          }

          // Total time from start to load
          _timing.loadTime = timing.loadEventEnd - timing.fetchStart;
          // Time spent constructing the DOM tree
          _timing.domReadyTime = timing.domComplete - timing.domInteractive;
          // Time consumed preparing the new page
          _timing.readyStart = timing.fetchStart - timing.navigationStart;
          // Time spent during redirection
          _timing.redirectTime = timing.redirectEnd - timing.redirectStart;
          // AppCache
          _timing.appcacheTime = timing.domainLookupStart - timing.fetchStart;
          // Time spent unloading documents
          _timing.unloadEventTime = timing.unloadEventEnd - timing.unloadEventStart;
          // DNS query time
          _timing.lookupDomainTime = timing.domainLookupEnd - timing.domainLookupStart;
          // TCP connection time
          _timing.connectTime = timing.connectEnd - timing.connectStart;
          // Time spent during the request
          _timing.requestTime = timing.responseEnd - timing.requestStart;
          // Request to completion of the DOM loading
          _timing.initDomTreeTime = timing.domInteractive - timing.responseEnd;
          // Load event time
          _timing.loadEventTime = timing.loadEventEnd - timing.loadEventStart;

          return _timing;
        }
        if (_supported()) {
          // console.log("performance package initiated");
        }
        return {
          info: function() {
            return _timinginfo();
          },
          resources: function() {
            return _resources();
          },
          marker: function() {
            return _markers();
          },
          crp: function() {
            return _measureCRP();
          }
        };
      },
      _module;

    _module = {

      Performance: _Performance,

      _test: function() {
        // performance handle
        let performance = new _module.Performance();

        // markers
        let marker = new performance.marker();
        marker.mark("markstart");
        let resources = performance.resources();

        // resources measures
        resources.measure().print();

        // critical render path
        performance.crp().print();

        // timing info
        performance.info();
        marker.mark("markend");


        // measure the time since "markstart" until this point
        console.log(marker.measure("markstart", "markend", "measure1"));
      }
    };
    return _module;
  };

}


