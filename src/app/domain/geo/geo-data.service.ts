import "rxjs/Rx";
import {Observable} from "rxjs/Observable";

import {Injectable} from "@angular/core";
import {Http, Headers, Response, URLSearchParams} from "@angular/http";

import {environment} from "../../../environments/environment";

import {City} from "./city.model";
import {GeoResponse} from "../common/geo-response.model";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Country} from "./country.model";
import {Region} from "./region.model";

@Injectable()
export class GeoDataService {
  private citiesEndpoint: string;
  private countriesEndpoint: string;

  constructor(private httpClient: HttpClient) {
    this.citiesEndpoint = environment.service.endpoint + "/v1/geo/cities";
    this.countriesEndpoint = environment.service.endpoint + "/v1/geo/countries";
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

  findRegions(
    countryCode: string,
    limit: number,
    offset: number): Observable<GeoResponse<Region[]>> {

    const endpoint = this.buildRegionsEndpoint(countryCode);

    const params: HttpParams = this.buildPagingParams(limit, offset);

    return this.httpClient.get<GeoResponse<Region[]>>(
      endpoint,
      {
        params: params
      }
    );
  }

  findRegionCities(
    countryCode: string,
    regionCode: string,
    minCityPopulation: number,
    limit: number,
    offset: number): Observable<GeoResponse<City[]>> {

    const endpoint = this.buildRegionEndpoint(countryCode, regionCode) + "/cities";

    let params: HttpParams = this.buildPagingParams(limit, offset);

    if (minCityPopulation) {
      params = params.set("minPopulation", "" + minCityPopulation);
    }

    return this.httpClient.get<GeoResponse<City[]>>(
      endpoint,
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

  private buildRegionEndpoint(countryCode: string, regionCode: string): string {
    return this.buildRegionsEndpoint(countryCode) + "/" + regionCode;
  }

  private buildRegionsEndpoint(countryCode: string): string {
    return this.countriesEndpoint + "/" + countryCode + "/regions";
  }
}
