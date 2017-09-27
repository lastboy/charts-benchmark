import {AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ChartRendererEnum, ChartRendererUtils} from '../../../state/model/ChartRendererEnum';
import {IRenderer} from "./renderer/IRenderer";
import {DataService, MetaDataProvider} from "../../../services/DataProvider";
import {ChartRendererFactory} from "../../../state/model/ChartRendererFactory";
import {IChart} from "../../../state/model/IChartVM";
import {Veyron} from "../../performance/performance";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  _chartData: IChart;
  _data: DataService;
  _chart: IRenderer;
  _name: string;

  @ViewChild('chartelement') chartElement;
  private _renderer: ChartRendererEnum = ChartRendererEnum.CHARTJS;
  private _performance: any;

  @Input()
  set renderer(name: string) {

    if (name && ChartRendererUtils.parse(name)) {
      this._renderer = ChartRendererUtils.parse(name);
    }
  }

  @Input()
  set name(name: string) {
    this._name = name;
  }

  @Input()
  set data(data: IChart) {
    this._chartData = data;

    if (this._chartData) {
      this._name = this._chartData.name;
      this._renderer = this._chartData.renderer;
    }
  }

  constructor(private dataService: DataService) {
    this._data = dataService;
    this._performance = Veyron.performance();

  }

  ngOnChanges() {
    //
    // // markers
    // let marker = new performance.marker();
    // marker.mark("markstart");
    //
    // marker.mark("markend");
    //
    //
    // // measure the time since "markstart" until this point
    // console.log(marker.measure("markstart", "markend", "measure1"));

    this._chartInit();
    this._chartDraw();
  }

  ngOnInit() {
    this._chartInit();
  }

  ngOnDestroy() {

  }

  ngAfterViewInit() {
    this._chartDraw();
  }

  public destroy() {
    if (this._chart) {
      this._chart.destroy();
    }
    this._chart = null;
  }

  private _chartInit() {

    if (this._valid()) {

      this._chart = ChartRendererFactory.instance(this._renderer);
      this._chart.init(
        this._name,
        this.chartElement.nativeElement,
        this._data.getData(<MetaDataProvider> {
          renderer: this._chartData.renderer,
          series: this._chartData.chartSeries,
          points: this._chartData.chartPoints
        }));
    }
  }

  private _chartDraw() {

    if (this._valid()) {
      this._chart.draw();
    }
  }

  private _valid() {
    return (this._name && this._renderer !== undefined);
  }

}
