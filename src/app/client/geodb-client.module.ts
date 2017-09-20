import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {ModuleWithProviders, NgModule} from "@angular/core";

import {AuthInterceptor} from "./auth.interceptor";
import {GeoDataService} from "./geo-data.service";
import {GeoClientConfig} from "./model/geo-client-config.model";

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
  static forRoot(config: GeoClientConfig): ModuleWithProviders {
    return {
      ngModule: GeoDbClientModule,
      providers: [
        {provide: GeoClientConfig, useValue: config}
      ]
    };
  }

  constructor(config: GeoClientConfig) {
  }
}
