import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {NgModule} from "@angular/core";

import {AuthInterceptor} from "./auth.interceptor";
import {GeoDataService} from "./geo-data.service";

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

}
