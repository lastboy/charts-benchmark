import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ChartRendererEnum, ChartRendererUtils} from '../state/model/ChartRendererEnum';
import {IRenderer} from "./renderer/IRenderer";
import {DataService} from "../services/DataProvider";
import {ChartRendererFactory} from "../state/model/ChartRendererFactory";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit {
  _data: DataService;
  _chart: IRenderer;
  _name: string;

  @ViewChild('chartelement') chartElement;
  private _renderer: ChartRendererEnum = ChartRendererEnum.CHARTJS;

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

  constructor(private data: DataService) {
    this._data = data;
  }

  ngOnInit() {
    this._chart = ChartRendererFactory.instance(this._renderer);
    this._chart.init(
      this._name,
      this.chartElement.nativeElement,
      this._data);
  }

  ngAfterViewInit() {

    this._chart.draw();

  }

}
