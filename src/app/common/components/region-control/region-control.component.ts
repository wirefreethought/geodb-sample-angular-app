import {Component, Input, OnInit, Output} from "@angular/core";
import {FormControl} from "@angular/forms";

import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

import {GeoDbService} from "wft-geodb-angular-client";
import {GeoResponse} from "wft-geodb-angular-client/model/geo-response.model";
import {RegionSummary} from "wft-geodb-angular-client/model/region-summary.model";

import {RestConstants} from "../../rest-constants.class";

@Component({
  selector: "app-region-control",
  templateUrl: "./region-control.component.html",
  styleUrls: ["./region-control.component.css"]
})
export class RegionControlComponent implements OnInit {

  @Output("regionCode")
  regionCodeSubject = new BehaviorSubject<string>(null);

  regionControl: FormControl;

  allRegions: RegionSummary[];
  filteredRegions: Observable<RegionSummary[]>;

  constructor(private geoDbService: GeoDbService) { }

  ngOnInit() {
    this.regionControl = new FormControl();

    this.allRegions = [];

    this.filteredRegions = this.regionControl.valueChanges
      .startWith(null)
      .map(region => region ? this.filterRegions(region) : this.allRegions.slice());
  }

  @Input("countryCode")
  set countryCode(countryCode: string) {
    if (!countryCode) {
      return;
    }

    this.regionControl.setValue(null);

    // We set a high limit to make sure we get all regions in a single call.
    this.geoDbService.findRegions({
        countryCode: countryCode,
        limit: 1000,
        offset: 0
      })
      .retry(RestConstants.MAX_RETRY)
      .do(
        (response: GeoResponse<RegionSummary[]>) => {
          this.allRegions = response.data.slice();
        }
      )
      .subscribe();
  }

  filterRegions(regionName: string) {
    const nameFilter: string = regionName.toLowerCase();

    return this.allRegions.filter(region => region.name.toLowerCase().indexOf(nameFilter) === 0);
  }

  getRegionCode(region: RegionSummary): string {
    let code: string = region.hascCode;

    if (!code) {
      code = region.isoCode;
    }

    if (!code) {
      code = region.fipsCode;
    }

    return code;
  }

  onRegionSelected(regionCode: string) {
    this.regionCodeSubject.next(regionCode);
  }
}
