import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChartModule} from "./components/chart/chart.module";

@NgModule({
  imports: [
    CommonModule,
    ChartModule
  ],
  declarations: [],
  exports: []
})
export class SharedModule { }
