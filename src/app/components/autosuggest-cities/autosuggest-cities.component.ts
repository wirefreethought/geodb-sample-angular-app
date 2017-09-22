import {Component, OnInit} from "@angular/core";
import {FormControl} from "@angular/forms";

import {Observable} from "rxjs/Observable";

import {AutoSuggestConstants} from "../../common/autosuggest-constants.class";
import {CityDetails} from "wft-geodb-angular-client/app/modules/geo-db/model/city-details.model";
import {CitySummary} from "wft-geodb-angular-client/app/modules/geo-db/model/city-summary.model";
import {GeoDbService} from "wft-geodb-angular-client/app/modules/geo-db/geodb.service";
import {GeoResponse} from "wft-geodb-angular-client/app/modules/geo-db/model/geo-response.model";

@Component({
  selector: "app-autosuggest-cities",
  templateUrl: "./autosuggest-cities.component.html",
  styleUrls: ["./autosuggest-cities.component.css"]
})
export class AutosuggestCitiesComponent implements OnInit {

  private MIN_CITY_POPULATION = 25000;

  selectedCity: CityDetails;
  cityControl: FormControl;
  filteredCities: Observable<CitySummary[]>;

  constructor(private geoDbService: GeoDbService) { }

  ngOnInit() {

    this.cityControl = new FormControl();

    this.filteredCities = this.cityControl.valueChanges
      .startWith(null)
      .switchMap( (cityNamePrefix: string) => {
        let citiesObservable: Observable<CitySummary[]> = Observable.of([]);

        if (cityNamePrefix && cityNamePrefix.length >= AutoSuggestConstants.MIN_INPUT_LENGTH) {

          citiesObservable = this.geoDbService.findCities(
            cityNamePrefix,
            null,
            this.MIN_CITY_POPULATION,
            AutoSuggestConstants.MAX_SUGGESTIONS,
            0)
            .map(
              (response: GeoResponse<CitySummary[]>) => {
                return response.data;
              },

              (error: any) => console.log(error)
            );
        }

        return citiesObservable;
      });
  }

  getCityDisplayName(city: CitySummary) {

    if (!city) {
      return null;
    }

    let name = city.city;

    if (city.region) {
      name += ", " + city.region;
    }

    name += ", " + city.country;

    return name;
  }

  onCitySelected(city: CitySummary) {

    this.geoDbService.findCityById(city.id)
      .subscribe(
        (response: GeoResponse<CityDetails>) => {
          this.selectedCity = response.data;
        });
  }
}
