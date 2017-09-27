import {ChartRendererEnum} from "../state/model/ChartRendererEnum";
import {MetaDataProvider} from "./DataProvider";
export class DataFormatter {

  private size = 10;
  private points = 100;

  constructor(){}

  public format(metadata: MetaDataProvider) {

    let dataset;

    this.size = metadata.series;
    this.points = metadata.points;

    switch (metadata.renderer) {
      case ChartRendererEnum.CANVASJS: {
        dataset = this.canvasjs();
        break;
      }
      case ChartRendererEnum.CHARTJS: {
        dataset = this.chartjs();
        break;
      }
      case ChartRendererEnum.DYGRAPH: {
        dataset = this.dygraphs();
        break;
      }
      case ChartRendererEnum.HIGHCHARTS: {
        dataset = this.highcharts();
        break;
      }
    }

    return dataset;
  }

  /**
   * CanvasJS Data Formatter
   *
   * @returns {{data: Array, labels: Array<string>}}
   */
  private canvasjs() {

    let dataset = [];
    let generatedData = this._data();
    const labels = this._labels();

    const dataitem = {
      type: "line",
      lineThickness:2,
      showInLegend: false,
      name: "xxx",
      dataPoints: null,
      toolTipContent:null
    };


    /*

    Category data format
    dataset = [
      { label: "ee", y: 0 },
      ...
    ];

     X, y data format
     dataset = [
     { x: 1, y: 0 },
     ...
     ];

    */

    generatedData.forEach((item) => {
      let tmp = {};
      Object.assign(tmp, dataitem);
      tmp['dataPoints'] = [];
      item.data.forEach((value, idx) => {
        tmp['dataPoints'].push({label: labels[idx], y: value});
      });
      dataset.push(tmp);
    });


    return {data: dataset, labels: this._labels()};

  }


  /**
   * CanvasJS Data Formatter
   *
   * @returns {{data: Array, labels: Array<string>}}
   */
  private highcharts() {

    let dataset = [];
    let generatedData = this._data();
    const labels = this._labels();

    const dataitem = {

    };


    /*

     Category data format

     X, y data format
     data: [
      [ 1, 0 ],
     ...
     ];

     */

    generatedData.forEach((item) => {
      let tmp = {};
      Object.assign(tmp, dataitem);
      tmp['data'] = [];
      item.data.forEach((value, idx) => {
        tmp['data'].push([labels[idx], value]);
      });
      dataset.push(tmp);
    });


    return {data: dataset, labels: this._labels()};

  }


  /**
   * ChartJS Data Formatter
   *
   * @returns {{data: Array, labels: Array<string>}}
   */
  private chartjs() {

    /*
      labels ['test', 'test1', ...]
      data   [1, 2, 3 ..]
     */

    return {data: this._data(), labels: this._labels()}
  }


  /**
   * Dygraphs DataFormatter
   *
   */
  private dygraphs() {

    /*
       first column is the x-axis

       data [
         [1,10,100],
         [2,20,80],
         ...
       ]

       labels: []
     */

    let generatedData = this._data();
    const labels = this._labels();
    const labelstr = ['x'];

    let dataset = [
    ];

    labels.forEach((item, i) => {
      if (!dataset[i]) {
        dataset[i] = [];
      }

      dataset[i].push(labels[i]);
    });

    generatedData.forEach((item, idx) => {

      labelstr.push(idx+"1");
      item.data.forEach((value, i) => {

        dataset[i].push(value);
      });

    });

    return {data: dataset, labels: labelstr}
  }




  private _labels(): Array<string> {

    let labels = [
    ];

    for (let x = 0; x < this.points; x++) {
      labels.push(this.getLabel(x));
    }

    return labels
  }

  private _data() {

    let tmp, datasets = [];

    for (let x = 0; x < this.size; x++) {
      tmp = {};
      datasets.push(tmp);
      tmp.data = [];
      tmp.backgroundColor = this.dynamicColors();

      let radius = Math.random() * 15;
      let mathFn = [Math.cos, Math.sin];
      for (let i = 0; i < this.points; i++) {
        tmp.data.push(this.randomScalingFactor(i, this.points, radius, mathFn[(i % 2)]));
      }
    }

    return datasets;
  }


  private dynamicColors() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  private randomScalingFactor(index, steps, radius, fn) {
    radius = (radius || 10);
    fn = (fn || Math.cos);
    return (radius * fn.call(this, 4 * Math.PI * index / steps));
  }

  private getLabel(days) {
    return this.points * days;
  }

  private newDates(days) {
    return "l--" + (this.points * days);
  }

}
