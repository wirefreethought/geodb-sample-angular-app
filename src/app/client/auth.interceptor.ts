import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";

import {environment} from "../../environments/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headers: HttpHeaders = request
      .headers
        .set("X-Mashape-Key", environment.service.apiKey);

    return next.handle(request.clone({headers: headers}));
  }
}
