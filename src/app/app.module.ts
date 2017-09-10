import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule, MdAutocompleteModule} from "@angular/material";
import {RouterModule} from "@angular/router";
import {GeoDataService} from "./domain/geo/geo-data.service";
import {AuthInterceptor} from "./common/auth/auth.interceptor";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";

import {APP_ROUTES} from "./app.routing";

import { AutosuggestCitiesComponent } from "./components/autosuggest-cities/autosuggest-cities.component";
import { FindCitiesComponent } from "./components/find-cities/find-cities.component";
import { FindRegionCitiesComponent } from './components/find-region-cities/find-region-cities.component';
import { CountryControlComponent } from './components/common/country-control/country-control.component';
import { RegionControlComponent } from './components/common/region-control/region-control.component';
import {AppMaterialModule} from "./app.material.module";

@NgModule({
  declarations: [
    AppComponent,
    AutosuggestCitiesComponent,
    FindCitiesComponent,
    FindRegionCitiesComponent,
    CountryControlComponent,
    RegionControlComponent
  ],
  imports: [
    // Angular
    BrowserModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES),

    // Angular Material
    AppMaterialModule,

    // NGX
    NgxDatatableModule
  ],
  providers: [
    GeoDataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

