import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule} from "@angular/router";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";

import {GeoDbModule} from "wft-geodb-angular-client";

import {AutosuggestCitiesComponent} from "./components/autosuggest-cities/autosuggest-cities.component";
import {FindCitiesComponent} from "./components/find-cities/find-cities.component";
import {FindRegionCitiesComponent} from "./components/find-region-cities/find-region-cities.component";

import {AppComponent} from "./app.component";
import {AppMaterialModule} from "./app.material.module";
import {APP_ROUTES} from "./app.routing";

import {CountryControlComponent} from "./common/components/country-control/country-control.component";
import {RegionControlComponent} from "./common/components/region-control/region-control.component";

import {environment} from "../environments/environment";
import { SetApiKeyComponent } from './components/set-api-key/set-api-key.component';

@NgModule({
  declarations: [
    AppComponent,
    AutosuggestCitiesComponent,
    CountryControlComponent,
    RegionControlComponent,
    FindCitiesComponent,
    FindRegionCitiesComponent,
    SetApiKeyComponent
  ],
  imports: [
    // Angular
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(APP_ROUTES),

    // NGX
    NgxDatatableModule,

    // Our App
    AppMaterialModule,
    GeoDbModule.forRoot({
      apiKey: environment.service.apiKey,
      serviceUri: environment.service.uri
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

