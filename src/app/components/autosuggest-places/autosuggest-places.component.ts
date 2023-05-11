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
  selector: 'app-autosuggest-places',
  templateUrl: './autosuggest-places.component.html',
  styleUrls: ['./autosuggest-places.component.css']
})
export class AutosuggestPlacesComponent implements OnInit {

  private MIN_PLACE_POPULATION = 40000;

  selectedPlace: PlaceDetails;
  placeControl: FormControl;
  filteredPlaces: Observable<PlaceSummary[]>;

  constructor(private geoDbService: GeoDbService) { }

  ngOnInit() {

    this.placeControl = new FormControl();

    this.filteredPlaces = this.placeControl.valueChanges
      .pipe(
        switchMap( (placeNamePrefix: string) => {
          let placesObservable: Observable<PlaceSummary[]> = of([]);

          if (placeNamePrefix && placeNamePrefix.length >= AutoSuggestConstants.MIN_INPUT_LENGTH) {

            placesObservable = this.geoDbService.findPlaces({
              namePrefix: placeNamePrefix,
              minPopulation: this.MIN_PLACE_POPULATION,
              sortDirectives: ['-population'],
              limit: AutoSuggestConstants.MAX_SUGGESTIONS,
              offset: 0
            })
              .pipe(
                map(
                  (response: GeoResponse<PlaceSummary[]>) => {
                    return response.data;
                  }
                )
              );
          }

          return placesObservable;
        })
      );
  }

  getPlaceDisplayName(place: PlaceSummary) {

    if (!place) {
      return null;
    }

    let name = place.name;

    if (place.region) {
      name += ', ' + place.region;
    }

    name += ', ' + place.country;

    return name;
  }

  onPlaceSelected(place: PlaceSummary) {

    this.geoDbService.getPlace({
      placeId: place.id
    })
      .subscribe(
        (response: GeoResponse<PlaceDetails>) => {
          this.selectedPlace = response.data;
        });
  }
}
