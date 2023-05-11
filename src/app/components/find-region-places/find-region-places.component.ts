import {retry} from 'rxjs/operators';

import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

import {GeoDbService} from 'wft-geodb-angular-client';
import {PlaceSummary} from 'wft-geodb-angular-client/lib/model/place-summary.model';
import {GeoResponse} from 'wft-geodb-angular-client/lib/model/geo-response.model';

import {RestConstants} from '../../common/rest-constants.class';

@Component({
  selector: 'app-find-region-places',
  templateUrl: './find-region-places.component.html',
  styleUrls: ['./find-region-places.component.css']
})
export class FindRegionPlacesComponent implements OnInit {

  readonly PLACE_RESULTS_COLUMNS = [{name: 'ID'}, {name: 'Name'}];

  countryCode: string;
  regionId: string | null;

  minPopulationControl: FormControl;
  placeResultsCurrent = new Array<PlaceSummary>();
  placeResultsTotalCount = 0;
  placeResultsCurrentPage = 0;
  placeResultsPageSize = RestConstants.MAX_PAGING_LIMIT;

  constructor(private geoDbService: GeoDbService) { }

  ngOnInit() {
    this.minPopulationControl = new FormControl();
    this.minPopulationControl.disable();
  }

  onCountryCodeSelected(countryCode: string) {
    this.countryCode = countryCode;
    this.regionId = null;
  }

  onRegionCodeSelected(regionId: string) {
    this.regionId = regionId;
  }

  setPlaceResultsPage(page: number) {
    if (!this.countryCode || !this.regionId) {
      return;
    }

    this.placeResultsCurrentPage = page;

    const offset = page * this.placeResultsPageSize;

    const minPopulation = this.minPopulationControl.enabled ? this.minPopulationControl.value : null;

    this.geoDbService.findRegionPlaces({
        countryId: this.countryCode,
        regionId: this.regionId,
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

  updateResults() {
    this.setPlaceResultsPage(0);
  }
}
