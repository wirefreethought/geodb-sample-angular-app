import "rxjs/Rx";
import {Observable} from "rxjs/Observable";

import {Injectable} from "@angular/core";

import {environment} from "../../../environments/environment";

import {CitySummary} from "./city-summary.model";
import {GeoResponse} from "../common/geo-response.model";
import {HttpClient, HttpParams, HttpUrlEncodingCodec} from "@angular/common/http";
import {Country} from "./country.model";
import {Region} from "./region.model";
import {NearLocationRequest} from "./near-location.request";
import {CityDetails} from "./city-details.model";

@Injectable()
export class GeoDataService {
  private citiesEndpoint: string;
  private countriesEndpoint: string;

  constructor(private httpClient: HttpClient) {
    this.citiesEndpoint = environment.service.endpoint + "/v1/geo/cities";
    this.countriesEndpoint = environment.service.endpoint + "/v1/geo/countries";
  }

  findCityById(id: number): Observable<GeoResponse<CityDetails>> {
    const endpoint = this.citiesEndpoint + "/" + id;

    return this.httpClient.get<GeoResponse<CityDetails>>(endpoint);
  }

  findCities(
    namePrefix: string,
    countryCode: string,
    minCityPopulation: number,
    limit: number,
    offset: number): Observable<GeoResponse<CitySummary[]>> {

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

    return this.httpClient.get<GeoResponse<CitySummary[]>>(
      this.citiesEndpoint,
      {
        params: params
      }
    );
  }

  findCitiesNearLocation(
    nearLocation: NearLocationRequest,
    namePrefix: string,
    minCityPopulation: number,
    limit: number,
    offset: number): Observable<GeoResponse<CitySummary[]>> {

    let params: HttpParams = this.buildPagingParams(limit, offset);

    params = params
      .set("nearLocation", this.toNearLocationString(nearLocation))
      .set("nearLocationRadius", "" + nearLocation.radius)
      .set("nearLocationRadiusUnit", "MI");

    if (namePrefix) {
      params = params.set("namePrefix", namePrefix);
    }

    if (minCityPopulation) {
      params = params.set("minPopulation", "" + minCityPopulation);
    }

    return this.httpClient.get<GeoResponse<CitySummary[]>>(
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
    offset: number): Observable<GeoResponse<CitySummary[]>> {

    const endpoint = this.buildRegionEndpoint(countryCode, regionCode) + "/cities";

    let params: HttpParams = this.buildPagingParams(limit, offset);

    if (minCityPopulation) {
      params = params.set("minPopulation", "" + minCityPopulation);
    }

    return this.httpClient.get<GeoResponse<CitySummary[]>>(
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

  private toNearLocationString(nearLocation: NearLocationRequest): string {
    let locationString = "";

    if (nearLocation.latitude > 0) {
      locationString += "+";
    }

    locationString += nearLocation.latitude;

    if (nearLocation.longitude > 0) {
      locationString += "+";
    }

    locationString += nearLocation.longitude;

    return locationString;
  }
}
