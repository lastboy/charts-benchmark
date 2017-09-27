import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import {FormComponent} from "./form/form.component";
import {MdButtonModule, MdSelectModule, MdOptionModule, MdInputModule} from '@angular/material';
import {ReactiveFormsModule} from "@angular/forms";
import {ChartService} from "../services/chart.service";
import {SharedModule} from "../shared/shared.module";
import {TableComponent} from "./table/table.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MdButtonModule,
    MdSelectModule,
    MdOptionModule,
    MdInputModule,
    ReactiveFormsModule
  ],
  declarations: [HomepageComponent, FormComponent, TableComponent],
  exports: [MdButtonModule, MdSelectModule, MdOptionModule, MdInputModule],
  providers:[ChartService]
})
export class HomepageModule { }
