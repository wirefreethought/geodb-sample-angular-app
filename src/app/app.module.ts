import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule} from "@angular/router";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";

import {GeodbClientModule} from "./client/geodb-client.module";

import {GeoDbCommonModule} from "./common/geodb-common.module";

import {AutosuggestCitiesComponent} from "./components/autosuggest-cities/autosuggest-cities.component";
import {FindCitiesComponent} from "./components/find-cities/find-cities.component";
import {FindRegionCitiesComponent} from "./components/find-region-cities/find-region-cities.component";

import {AppComponent} from "./app.component";
import {AppMaterialModule} from "./app.material.module";
import {APP_ROUTES} from "./app.routing";

@NgModule({
  declarations: [
    AppComponent,
    AutosuggestCitiesComponent,
    FindCitiesComponent,
    FindRegionCitiesComponent
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
    GeoDbCommonModule,
    GeodbClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

