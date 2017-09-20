import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {ModuleWithProviders, NgModule} from "@angular/core";

import {AuthInterceptor} from "./auth.interceptor";
import {GeoDataService} from "./geo-data.service";
import {GeoDbConfig} from "./model/geodb-config.model";

@NgModule({
  providers: [
    GeoDataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  imports: [
    HttpClientModule
  ]
})
export class GeoDbClientModule {
  static forRoot(config: GeoDbConfig): ModuleWithProviders {
    return {
      ngModule: GeoDbClientModule,
      providers: [
        {provide: GeoDbConfig, useValue: config}
      ]
    };
  }

  constructor(config: GeoDbConfig) {
  }
}
