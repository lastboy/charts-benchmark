import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BenchmarkComponent } from './benchmark.component';
import { ChartComponent } from '../chart/chart.component';
import {ChartModule} from '../chart/chart.module';

@NgModule({
  imports: [
    CommonModule,
    ChartModule
  ],
  declarations: [BenchmarkComponent]
})
export class BenchmarkModule { }
