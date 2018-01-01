import {Component, Input, OnInit, Output} from "@angular/core";
import {FormControl} from "@angular/forms";

import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

import {GeoDbService} from "wft-geodb-angular-client";
import {CountrySummary} from "wft-geodb-angular-client/model/country-summary.model";
import {GeoResponse} from "wft-geodb-angular-client/model/geo-response.model";

import {AutoSuggestConstants} from "../../autosuggest-constants.class";

@Component({
  selector: "app-country-control",
  templateUrl: "./country-control.component.html",
  styleUrls: ["./country-control.component.css"]
})
export class CountryControlComponent implements OnInit {

  @Output("countryCode")
  countryCodeSubject = new BehaviorSubject<string>(null);

  countryControl = new FormControl();

  filteredCountries: Observable<CountrySummary[]>;

  private _enabled: boolean;

  constructor(private geoDbService: GeoDbService) {
  }

  ngOnInit() {

    this.filteredCountries = this.countryControl.valueChanges
      .switchMap( (namePrefix: string) => {
        let countriesObservable: Observable<CountrySummary[]> = Observable.of([]);

        if (namePrefix && namePrefix.length >= AutoSuggestConstants.MIN_INPUT_LENGTH) {

          countriesObservable = this.geoDbService.findCountries({
            namePrefix: namePrefix,
            limit: AutoSuggestConstants.MAX_SUGGESTIONS,
            offset: 0
          })
            .map(
              (response: GeoResponse<CountrySummary[]>) => {
                return response.data;
              },

              (error: any) => console.log(error)
            );
        }

        return countriesObservable;
      });
  }

  @Output("disabled")
  get disabled() {
    return !this._enabled;
  }

  @Input("enabled")
  set enabled(enabled: boolean) {
    this._enabled = enabled;

    this.update();
  }

  disable() {
    if (this._enabled) {
      this._enabled = false;

      this.update();
    }
  }

  onCountrySelected(countryCode: string) {
    this.countryCodeSubject.next(countryCode);
  }

  toggleEnabled() {
    this._enabled = !this._enabled;

    this.update();

    return this._enabled;
  }

  private update() {
    this._enabled ? this.countryControl.enable() : this.countryControl.disable();
  }
}
