import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {IChart} from "../../state/model/IChartVM";
import {ChartService} from "../../services/chart.service";
import {IMAGES_RED_X} from "../../shared/images/redx";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  _charts: any;
  public benchmarkEvent = new BehaviorSubject([]);
  public redXImage = IMAGES_RED_X;

  constructor(private chartService: ChartService) {
    this._charts = this.chartService.getCharts();
  }

  ngOnInit() {
    Observable.from(this._charts).subscribe((data: Array<IChart>) => {
      //let lastItem = data[data.length-1];
      // if (lastItem) {
      this.benchmarkEvent.next(data);
      // }
    });
  }

  benchmark(id: string, e) {

      // Do not submit the form
      // if (e) e.preventDefault();

      // route
      //this.router.navigate(['/benchmark']);

      // open a new window
    let url = ["/benchmark", id].join("/");
    window.open(url);
  }

  remove(id: string) {
    this.chartService.removeChart(id);
  }
}
