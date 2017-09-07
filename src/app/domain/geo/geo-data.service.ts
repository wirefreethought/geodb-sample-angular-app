import "rxjs/Rx";
import {Observable} from "rxjs/Observable";

import {Injectable} from "@angular/core";
import {Http, Headers, Response, URLSearchParams} from "@angular/http";

import {environment} from "../../../environments/environment";

import {City} from "./city.model";
import {GeoResponse} from "../common/geo-response.model";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Country} from "./country.model";

@Injectable()
export class GeoDataService {
  private citiesEndpoint: string;
  private countriesEndpoint: string;

  constructor(private httpClient: HttpClient) {
    this.citiesEndpoint = environment.geoData.endpoint + "/v1/geo/cities";
    this.countriesEndpoint = environment.geoData.endpoint + "/v1/geo/countries";
  }

  findCities(
    namePrefix: string,
    countryCode: string,
    minCityPopulation: number,
    limit: number,
    offset: number): Observable<GeoResponse<City[]>> {

    let params: HttpParams = this.buildPagingParams(limit, offset);

    if (namePrefix) {
      params = params.set("namePrefix", namePrefix);
    }

    if (countryCode) {
      params = params.set("countryCode", countryCode);
    }

    if (minCityPopulation) {
      params = params.set("minPopulation", "" + minCityPopulation);
    }

    return this.httpClient.get<GeoResponse<City[]>>(
      this.citiesEndpoint,
      {
        params: params
      }
    );
  }

  findCountries(
    currencyCode: string,
    limit: number,
    offset: number): Observable<GeoResponse<Country[]>> {

    let params: HttpParams = this.buildPagingParams(limit, offset);

    if (currencyCode) {
      params = params.set("currencyCode", currencyCode);
    }

    return this.httpClient.get<GeoResponse<Country[]>>(
      this.countriesEndpoint,
      {
        params: params
      }
    );
  }

  private buildPagingParams(limit: number, offset: number): HttpParams {
    return new HttpParams()
      .set("offset", "" + offset)
      .set("limit", "" + limit);
  }
}
