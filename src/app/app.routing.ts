import {Routes} from '@angular/router';
import {HomepageComponent} from './homepage/homepage/homepage.component';
import {BenchmarkComponent} from './benchmark/benchmark.component';



export const appRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        component: HomepageComponent
      },
      {
        path: 'benchmark',
        component: BenchmarkComponent
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      }
    ]
  }
];

