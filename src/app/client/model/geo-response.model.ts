import {GeoError} from "./geo-error.model";
import {forEach} from "@angular/router/src/utils/collection";

export class GeoResponse<T> {
  errors: GeoError[] = new Array<GeoError>();
  data: T;
  metadata: any;

  static buildForData(data: any, metadata: any): GeoResponse<any> {
    const response: GeoResponse<any> = new GeoResponse<any>();

    response.data = data;
    response.metadata = metadata;

    return response;
  }

  static buildForError(error: GeoError): GeoResponse<any> {
    const response: GeoResponse<any> = new GeoResponse<any>();

    response.errors.push(error);

    return response;
  }

  static buildForErrors(errors: GeoError[]): GeoResponse<any> {
    const response: GeoResponse<any> = new GeoResponse<any>();

    for (const error of errors) {
      response.errors.push(error);
    }

    return response;
  }
}
