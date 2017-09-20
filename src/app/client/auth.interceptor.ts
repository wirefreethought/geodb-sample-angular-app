import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";

import {GeoClientConfig} from "./model/geo-client-config.model";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private config: GeoClientConfig) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headers: HttpHeaders = request
      .headers
        .set("X-Mashape-Key", this.config.apiKey);

    return next.handle(request.clone({headers: headers}));
  }
}
