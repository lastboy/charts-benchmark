import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChartComponent} from './chart.component';
import {DataService} from 'app/services/DataProvider';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [DataService],
  declarations: [ChartComponent],
  exports: [ChartComponent]
})
export class ChartModule { }
