import { Component, OnInit } from "@angular/core";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {City} from "../../domain/geo/city.model";
import {GeoDataService} from "../../domain/geo/geo-data.service";
import {AutoSuggestConstants} from "../../common/autosuggest-constants.class";
import {GeoResponse} from "../../domain/common/geo-response.model";

@Component({
  selector: "app-autosuggest-cities",
  templateUrl: "./autosuggest-cities.component.html",
  styleUrls: ["./autosuggest-cities.component.css"]
})
export class AutosuggestCitiesComponent implements OnInit {

  private MIN_CITY_POPULATION = 25000;

  cityControl: FormControl;
  filteredCities: Observable<City[]>;

  constructor(private geoDataService: GeoDataService) { }

  ngOnInit() {
    this.cityControl = new FormControl();

    this.filteredCities = this.cityControl.valueChanges
      .startWith(null)
      .switchMap( (cityNamePrefix: string) => {
        let citiesObservable: Observable<City[]> = Observable.of([]);

        if (cityNamePrefix && cityNamePrefix.length >= AutoSuggestConstants.MIN_INPUT_LENGTH) {

          citiesObservable = this.geoDataService.findCities(
            cityNamePrefix,
            null,
            this.MIN_CITY_POPULATION,
            AutoSuggestConstants.MAX_SUGGESTIONS,
            0)
            .map(
              (response: GeoResponse<City[]>) => {
                return response.data;
              },

              (error: any) => console.log(error)
            );
        }

        return citiesObservable;
      });
  }

  getCityDisplayName(city: City) {
    let name = city.city;

    if (city.region) {
      name += ", " + city.region;
    }

    name += ", " + city.country;

    return name;
  }
}
