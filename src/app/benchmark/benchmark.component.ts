import {AfterContentChecked, Component, OnInit} from '@angular/core';
import 'rxjs/add/observable/from';
import {ActivatedRoute, Params} from "@angular/router";
import {ChartService} from "../services/chart.service";
import {IChart} from "../state/model/IChartVM";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {Veyron} from "../shared/performance/performance";
import {ILog} from "../state/model/ILog";

@Component({
  selector: 'app-benchmark',
  templateUrl: './benchmark.component.html',
  styleUrls: ['./benchmark.component.css']
})
export class BenchmarkComponent implements OnInit, AfterContentChecked {

  _performance: any;
  _data: IChart;
  _once: Boolean = false;
  public benchmarkEvent: Observable<IChart>;
  public log: Observable<any>;
  private _id: any;

  constructor(private route : ActivatedRoute, private chartService: ChartService) {
    this._performance = Veyron.performance();
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params : Params) => {
        this._id = params["id"];
        if (this._id) {
          this._data = this.chartService.getChart(this._id);
          this.benchmarkEvent = Observable.of(this._data);
        }
      }
    );

    this.log = this.chartService.log();
  }

  ngAfterContentChecked(): void {

    if (!this._once) {
      // performance handle
      let performance = new this._performance.Performance();

      // resources loaded
      let resources = performance.resources();

      // resources measures
      this.chartService.addLog(this._id, <ILog>{
        date: new Date(),
        message: resources.measure()
      });

      // critical render path
      this.chartService.addLog(this._id, <ILog>{
        date: new Date(),
        message: performance.crp()
      });

      this._once = true;
    }

  }

}
