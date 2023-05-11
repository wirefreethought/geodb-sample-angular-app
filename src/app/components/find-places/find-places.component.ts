import {retry} from 'rxjs/operators';

import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';

import {CountryControlComponent} from '../../common/components/country-control/country-control.component';

import {GeoDbService} from 'wft-geodb-angular-client';

import {RestConstants} from '../../common/rest-constants.class';
import {PlaceSummary} from 'wft-geodb-angular-client/lib/model/place-summary.model';
import {GeoResponse} from 'wft-geodb-angular-client/lib/model/geo-response.model';
import {NearLocationRequest} from 'wft-geodb-angular-client/lib/request/near-location-request.model';

@Component({
  selector: 'app-search-places-component',
  templateUrl: './find-places.component.html',
  styleUrls: ['./find-places.component.css']
})
export class FindPlacesComponent implements OnInit {

  readonly PLACE_RESULTS_COLUMNS_NO_COUNTRY = [{name: 'ID'}, {name: 'Name'}, {name: 'Region'}];
  readonly PLACE_RESULTS_COLUMNS = [...this.PLACE_RESULTS_COLUMNS_NO_COUNTRY, {name: 'Country'}];

  @ViewChild('countryControl')
  countryControlComponent: CountryControlComponent;

  countryCode: string;

  placeControl: FormControl;
  minPopulationControl: FormControl;

  placeResultsColumns: Array<{name:string}> = [];
  placeResultsCurrent = new Array<PlaceSummary>();
  placeResultsTotalCount = 0;
  placeResultsCurrentPage = 0;
  placeResultsPageSize = RestConstants.MAX_PAGING_LIMIT;

  nearLocationLatitudeControl: FormControl;
  nearLocationLongitudeControl: FormControl;
  nearLocationRadius: FormControl;

  nearLocationControlsDisabled: boolean;

  constructor(private geoDbService: GeoDbService) { }

  ngOnInit() {
    this.placeControl = new FormControl();
    this.placeControl.disable();

    this.minPopulationControl = new FormControl();
    this.minPopulationControl.disable();

    this.nearLocationLatitudeControl = new FormControl();
    this.nearLocationLongitudeControl = new FormControl();
    this.nearLocationRadius = new FormControl();

    this.disableNearLocationControls();

    this.updateResults();
  }

  disableNearLocationControls() {
    this.nearLocationLatitudeControl.disable();
    this.nearLocationLongitudeControl.disable();
    this.nearLocationRadius.disable();
    this.nearLocationControlsDisabled = true;
  }

  enableNearLocationControls() {
    this.nearLocationLatitudeControl.enable();
    this.nearLocationLongitudeControl.enable();
    this.nearLocationRadius.enable();
    this.nearLocationControlsDisabled = false;

    this.countryControlComponent.disable();
  }

  onCountryCodeSelected(countryCode: string) {
    this.countryCode = countryCode;
  }

  onCountryControlEnabled(enabled: boolean) {
    if (!enabled) {
      this.countryCode = '';
    } else {
      this.disableNearLocationControls();
    }
  }

  setPlaceResultsPage(page: number) {
    this.placeResultsCurrentPage = page;

    const offset = page * this.placeResultsPageSize;

    const namePrefix = this.placeControl.enabled ? this.placeControl.value : null;
    const minPopulation = this.minPopulationControl.enabled ? this.minPopulationControl.value : null;

    this.placeResultsColumns = this.PLACE_RESULTS_COLUMNS;

    if (this.nearLocationControlsDisabled) {
      if (this.countryCode) {
        this.placeResultsColumns = this.PLACE_RESULTS_COLUMNS_NO_COUNTRY;
      }

      this.geoDbService.findPlaces({
          namePrefix: namePrefix,
          countryIds: [
            this.countryCode
          ],
          minPopulation: minPopulation,
          limit: this.placeResultsPageSize,
          offset: offset
        })
        .pipe(
          retry(RestConstants.MAX_RETRY)
        )
        .subscribe(
          (response: GeoResponse<PlaceSummary[]>) => {
            this.placeResultsTotalCount = response.metadata.totalCount;

            this.placeResultsCurrent = [...response.data];
          });
    } else {
      const nearLocationRequest: NearLocationRequest = {
        latitude: this.nearLocationLatitudeControl.value,
        longitude: this.nearLocationLongitudeControl.value,
        radius: this.nearLocationRadius.value,
        distanceUnit: 'MI'
      };

      this.geoDbService.findPlacesNearLocation({
          location: nearLocationRequest,
          namePrefix: namePrefix,
          minPopulation: minPopulation,
          limit: this.placeResultsPageSize,
          offset: offset
        })
        .pipe(
          retry(RestConstants.MAX_RETRY)
        )
        .subscribe(
          (response: GeoResponse<PlaceSummary[]>) => {
            this.placeResultsTotalCount = response.metadata.totalCount;

            this.placeResultsCurrent = [...response.data];
          });
    }
  }

  updateResults() {
    this.setPlaceResultsPage(0);
  }
}
