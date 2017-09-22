import {Component, OnInit} from "@angular/core";
import {FormControl} from "@angular/forms";

import {GeoDbService} from "wft-geodb-angular-client/app/modules/geo-db/geodb.service";
import {CitySummary} from "wft-geodb-angular-client/app/modules/geo-db/model/city-summary.model";
import {GeoResponse} from "wft-geodb-angular-client/app/modules/geo-db/model/geo-response.model";

import {RestConstants} from "../../common/rest-constants.class";

@Component({
  selector: "app-find-region-cities",
  templateUrl: "./find-region-cities.component.html",
  styleUrls: ["./find-region-cities.component.css"]
})
export class FindRegionCitiesComponent implements OnInit {

  readonly CITY_RESULTS_COLUMNS = [{name: "ID"}, {name: "CitySummary"}];

  countryCode: string;
  regionCode: string;

  minPopulationControl: FormControl;

  cityResultsColumns = [];
  cityResultsCurrent = new Array<CitySummary>();
  cityResultsTotalCount = 0;
  cityResultsCurrentPage = 0;
  cityResultsPageSize = RestConstants.MAX_PAGING_LIMIT;

  constructor(private geoDbService: GeoDbService) { }

  ngOnInit() {
    this.minPopulationControl = new FormControl();
    this.minPopulationControl.disable();
  }

  onCountryCodeSelected(countryCode: string) {
    this.countryCode = countryCode;
    this.regionCode = null;
  }

  onRegionCodeSelected(regionCode: string) {
    this.regionCode = regionCode;
  }

  setCityResultsPage(page: number) {
    if (!this.countryCode || !this.regionCode) {
      return;
    }

    this.cityResultsCurrentPage = page;

    const offset = page * this.cityResultsPageSize;

    const minPopulation = this.minPopulationControl.enabled ? this.minPopulationControl.value : null;

    this.geoDbService.findRegionCities(this.countryCode, this.regionCode, minPopulation, this.cityResultsPageSize, offset)
      .retry(RestConstants.MAX_RETRY)
      .subscribe(
        (response: GeoResponse<CitySummary[]>) => {
          this.cityResultsTotalCount = response.metadata.totalCount;

          this.cityResultsCurrent = [...response.data];
        });
  }

  updateResults() {
    this.setCityResultsPage(0);
  }
}
