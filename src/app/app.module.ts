import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HomepageModule} from './homepage/homepage.module';
import {appRoutes} from './app.routing';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {RouterStoreModule} from '@ngrx/router-store';
import {StoreModule} from '@ngrx/store';
import {RouterModule} from '@angular/router';

import {reducer} from './app.state';
import {BenchmarkModule} from './benchmark/benchmark.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    /**
     * StoreModule.provideStore is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.provideStore(reducer),

    /**
     * @ngrx/router-store keeps router state up-to-date in the store and uses
     * the store as the single source of truth for the router's state.
     */
    RouterStoreModule.connectRouter(),

    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    StoreDevtoolsModule.instrumentOnlyWithExtension(),

    BrowserModule,
    HomepageModule,
    BenchmarkModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
