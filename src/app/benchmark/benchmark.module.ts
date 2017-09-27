import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BenchmarkComponent } from './benchmark.component';
import {ChartModule} from '../shared/components/chart/chart.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
  imports: [
    CommonModule,
    ChartModule,
    BrowserAnimationsModule
  ],
  declarations: [BenchmarkComponent],
  providers: []
})
export class BenchmarkModule { }
