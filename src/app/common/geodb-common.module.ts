import {NgModule} from "@angular/core";

import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {GeodbClientModule} from "../client/geodb-client.module";

import {AppMaterialModule} from "../app.material.module";

import {CountryControlComponent} from "./components/country-control/country-control.component";
import {RegionControlComponent} from "./components/region-control/region-control.component";

@NgModule({
  declarations: [
    CountryControlComponent,
    RegionControlComponent
  ],
  imports: [
    // Third-Party
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // Our App
    AppMaterialModule,
    GeodbClientModule
  ],
  exports: [
    CountryControlComponent,
    RegionControlComponent
  ]
})
export class GeoDbCommonModule {

}
