import {BehaviorSubject, Observable, of} from 'rxjs';
import { map, switchMap} from 'rxjs/operators';

import {Component, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

import {GeoDbService} from 'wft-geodb-angular-client';
import {RegionSummary} from 'wft-geodb-angular-client/lib/model/region-summary.model';
import {GeoResponse} from 'wft-geodb-angular-client/lib/model/geo-response.model';

import {AutoSuggestConstants} from '../../autosuggest-constants.class';

@Component({
  selector: 'app-region-control',
  templateUrl: './region-control.component.html',
  styleUrls: ['./region-control.component.css']
})
export class RegionControlComponent implements OnInit {

  @Output('regionCode')
  regionCodeSubject = new BehaviorSubject<string>(null);

  regionControl: FormControl;

  filteredRegions: Observable<RegionSummary[]>;

  constructor(private geoDbService: GeoDbService) { }

  ngOnInit() {
    this.regionControl = new FormControl();
  }

  @Input('countryCode')
  set countryCode(countryCode: string) {
    if (!countryCode) {
      return;
    }

    this.regionControl.setValue(null);

    this.filteredRegions = this.regionControl.valueChanges
      .pipe(
        switchMap( (namePrefix: string) => {
          let regionsObservable: Observable<RegionSummary[]> = of([]);

          if (namePrefix && namePrefix.length >= AutoSuggestConstants.MIN_INPUT_LENGTH) {

            regionsObservable = this.geoDbService.findRegions({
              countryId: countryCode,
              namePrefix: namePrefix,
              limit: AutoSuggestConstants.MAX_SUGGESTIONS,
              offset: 0
            })
              .pipe(
                map(
                  (response: GeoResponse<RegionSummary[]>) => {
                    return response.data;
                  },

                  (error: any) => console.log(error)
                )
              );
          }

          return regionsObservable;
        })
      );
  }

  getRegionCode(region: RegionSummary): string {
    let code: string = region.isoCode;

    if (!code) {
      code = region.fipsCode;
    }

    return code;
  }

  onRegionSelected(regionCode: string) {
    this.regionCodeSubject.next(regionCode);
  }
}
