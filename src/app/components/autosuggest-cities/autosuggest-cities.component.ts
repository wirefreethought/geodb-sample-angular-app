import {Observable, of} from 'rxjs';
import { map, switchMap} from 'rxjs/operators';

import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

import {GeoDbService} from 'wft-geodb-angular-client';
import {PlaceDetails} from 'wft-geodb-angular-client/lib/model/place-details.model';
import {PlaceSummary} from 'wft-geodb-angular-client/lib/model/place-summary.model';
import {GeoResponse} from 'wft-geodb-angular-client/lib/model/geo-response.model';

import {AutoSuggestConstants} from '../../common/autosuggest-constants.class';

@Component({
  selector: 'app-autosuggest-cities',
  templateUrl: './autosuggest-cities.component.html',
  styleUrls: ['./autosuggest-cities.component.css']
})
export class AutosuggestCitiesComponent implements OnInit {

  private MIN_CITY_POPULATION = 25000;

  selectedCity: PlaceDetails;
  cityControl: FormControl;
  filteredCities: Observable<PlaceSummary[]>;

  constructor(private geoDbService: GeoDbService) { }

  ngOnInit() {

    this.cityControl = new FormControl();

    this.filteredCities = this.cityControl.valueChanges
      .pipe(
        switchMap( (cityNamePrefix: string) => {
          let citiesObservable: Observable<PlaceSummary[]> = of([]);

          if (cityNamePrefix && cityNamePrefix.length >= AutoSuggestConstants.MIN_INPUT_LENGTH) {

            citiesObservable = this.geoDbService.findPlaces({
              namePrefix: cityNamePrefix,
              minPopulation: this.MIN_CITY_POPULATION,
              types: ['CITY'],
              sortDirectives: ['-population'],
              limit: AutoSuggestConstants.MAX_SUGGESTIONS,
              offset: 0
            })
              .pipe(
                map(
                  (response: GeoResponse<PlaceSummary[]>) => {
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

  getCityDisplayName(city: PlaceSummary) {

    if (!city) {
      return null;
    }

    let name = city.name;

    if (city.region) {
      name += ', ' + city.region;
    }

    name += ', ' + city.country;

    return name;
  }

  onCitySelected(city: PlaceSummary) {

    this.geoDbService.findPlace({
      placeId: city.id
    })
      .subscribe(
        (response: GeoResponse<PlaceDetails>) => {
          this.selectedCity = response.data;
        });
  }
}
