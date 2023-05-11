import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

import { AppComponent } from './app.component';
import {CountryControlComponent} from './common/components/country-control/country-control.component';
import {RegionControlComponent} from './common/components/region-control/region-control.component';
import { AppRoutingModule } from './app-routing.module';
import {AppMaterialModule} from './app.material.module';
import {GeoDbFreeModule} from 'wft-geodb-angular-client';

import {environment} from '../environments/environment';
import {FindRegionPlacesComponent} from './components/find-region-places/find-region-places.component';
import {FindPlacesComponent} from './components/find-places/find-places.component';
import {AutosuggestPlacesComponent} from './components/autosuggest-places/autosuggest-places.component';

@NgModule({
  declarations: [
    AppComponent,

    // Common
    CountryControlComponent,
    RegionControlComponent,

    // App-Specific
    AutosuggestPlacesComponent,
    FindPlacesComponent,
    FindRegionPlacesComponent
  ],
  imports: [
    // Angular
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,

    // Boostrap
    NgbModule,

    // NGX
    NgxDatatableModule,

    // Our App
    AppMaterialModule,
    AppRoutingModule,
    GeoDbFreeModule.forRoot({
      apiKey: '',
      serviceUri: environment.service.uri
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
