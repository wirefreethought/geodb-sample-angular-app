import {Observable, of} from 'rxjs';
import { map, switchMap} from 'rxjs/operators';

import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

import {GeoDbService} from 'wft-geodb-angular-client';
import {CityDetails} from 'wft-geodb-angular-client/lib/model/city-details.model';
import {CitySummary} from 'wft-geodb-angular-client/lib/model/city-summary.model';
import {GeoResponse} from 'wft-geodb-angular-client/lib/model/geo-response.model';

import {AutoSuggestConstants} from '../../common/autosuggest-constants.class';

@Component({
  selector: 'app-autosuggest-cities',
  templateUrl: './autosuggest-cities.component.html',
  styleUrls: ['./autosuggest-cities.component.css']
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
      .pipe(
        switchMap( (cityNamePrefix: string) => {
          let citiesObservable: Observable<CitySummary[]> = of([]);

          if (cityNamePrefix && cityNamePrefix.length >= AutoSuggestConstants.MIN_INPUT_LENGTH) {

            citiesObservable = this.geoDbService.findCities({
              namePrefix: cityNamePrefix,
              minPopulation: this.MIN_CITY_POPULATION,
              sortDirectives: ['-population'],
              limit: AutoSuggestConstants.MAX_SUGGESTIONS,
              offset: 0
            })
              .pipe(
                map(
                  (response: GeoResponse<CitySummary[]>) => {
                    return response.data;
                  },

                  (error: any) => console.log(error)
                )
              );
          }

          return citiesObservable;
        })
      );
  }

  getCityDisplayName(city: CitySummary) {

    if (!city) {
      return null;
    }

    let name = city.city;

    if (city.region) {
      name += ', ' + city.region;
    }

    name += ', ' + city.country;

    return name;
  }

  onCitySelected(city: CitySummary) {

    this.geoDbService.findCity({
      cityId: city.id
    })
      .subscribe(
        (response: GeoResponse<CityDetails>) => {
          this.selectedCity = response.data;
        });
  }
}
