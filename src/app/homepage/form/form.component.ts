import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ChartRendererEnum, ChartRendererUtils} from "../../state/model/ChartRendererEnum";
import {ChartService} from "../../services/chart.service";
import {ILog} from "../../state/model/ILog";
import {IChart} from "../../state/model/IChartVM";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {

  public chartForm: FormGroup;
  public chartRendererOptions: Array<any>;

  private _defaults = {
    renderer: ChartRendererEnum.HIGHCHARTS,
    chartPoints: 10,
    chartSeries: 10
  };

  private _submit = true;

  constructor(private chartService: ChartService) {

    this.chartRendererOptions = [
      { name: ChartRendererUtils.toString(ChartRendererEnum.CHARTJS).toLowerCase(), value: ChartRendererEnum.CHARTJS },
      { name: ChartRendererUtils.toString(ChartRendererEnum.DYGRAPH).toLowerCase(), value: ChartRendererEnum.DYGRAPH },
      { name: ChartRendererUtils.toString(ChartRendererEnum.CANVASJS).toLowerCase(), value: ChartRendererEnum.CANVASJS},
      { name: ChartRendererUtils.toString(ChartRendererEnum.HIGHCHARTS).toLowerCase(), value: ChartRendererEnum.HIGHCHARTS }
    ];

    let form = {};
    Object.assign(form, this._defaults);

    Object.keys(form).forEach((key) => {
      form[key] = new FormControl(this._defaults[key]);
    });

    this.chartForm = new FormGroup(form);

  }

  ngOnInit() {

  }

  submit() {
    if (this._submit) {
      // create store item
      let chart = this.chartForm.getRawValue();
      chart.log = [];
      this.chartService.addChart(<IChart> chart);
    }
    this._submit = true;
  }

  reset() {
    this.chartForm.reset(this._defaults);
    this._submit = false;
  }

  wipe() {
    this.reset();
    this.chartService.wipe();
    this._submit = false;
  }

  private _formItem(key: string): FormControl {
    return <FormControl>this.chartForm.get(key);
  }
}
