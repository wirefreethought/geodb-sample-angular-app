import {Component, Input, OnInit, Output} from "@angular/core";
import {FormControl} from "@angular/forms";

import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

import {GeoDbService} from "wft-geodb-angular-client";
import {GeoResponse} from "wft-geodb-angular-client/model/geo-response.model";
import {RegionSummary} from "wft-geodb-angular-client/model/region-summary.model";

import {AutoSuggestConstants} from "../../autosuggest-constants.class";

@Component({
  selector: "app-region-control",
  templateUrl: "./region-control.component.html",
  styleUrls: ["./region-control.component.css"]
})
export class RegionControlComponent implements OnInit {

  @Output("regionCode")
  regionCodeSubject = new BehaviorSubject<string>(null);

  regionControl: FormControl;

  filteredRegions: Observable<RegionSummary[]>;

  constructor(private geoDbService: GeoDbService) { }

  ngOnInit() {
    this.regionControl = new FormControl();
  }

  @Input("countryCode")
  set countryCode(countryCode: string) {
    if (!countryCode) {
      return;
    }

    this.regionControl.setValue(null);

    this.filteredRegions = this.regionControl.valueChanges
      .switchMap( (namePrefix: string) => {
        let regionsObservable: Observable<RegionSummary[]> = Observable.of([]);

        if (namePrefix && namePrefix.length >= AutoSuggestConstants.MIN_INPUT_LENGTH) {

          regionsObservable = this.geoDbService.findRegions({
            countryCode: countryCode,
            namePrefix: namePrefix,
            limit: AutoSuggestConstants.MAX_SUGGESTIONS,
            offset: 0
          })
            .map(
              (response: GeoResponse<RegionSummary[]>) => {
                return response.data;
              },

              (error: any) => console.log(error)
            );
        }

        return regionsObservable;
      });
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
