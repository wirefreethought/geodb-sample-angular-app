import {Component, Input, OnInit, Output} from "@angular/core";
import {FormControl} from "@angular/forms";

import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

import {GeoDbService} from "wft-geodb-angular-client";
import {CountrySummary} from "wft-geodb-angular-client/model/country-summary.model";
import {GeoResponse} from "wft-geodb-angular-client/model/geo-response.model";

import {RestConstants} from "../../rest-constants.class";

@Component({
  selector: "app-country-control",
  templateUrl: "./country-control.component.html",
  styleUrls: ["./country-control.component.css"]
})
export class CountryControlComponent implements OnInit {

  @Output("countryCode")
  countryCodeSubject = new BehaviorSubject<string>(null);

  countryControl = new FormControl();

  allCountries: CountrySummary[];
  filteredCountries: Observable<CountrySummary[]>;

  private _enabled: boolean;

  constructor(private geoDbService: GeoDbService) {
  }

  ngOnInit() {
    this.allCountries = [];

    this.filteredCountries = this.countryControl.valueChanges
      .startWith(null)
      .map(country => country ? this.filterCountries(country) : this.allCountries.slice());

    // We set a high limit to make sure we get all countries in a single call. This collection should be cached at app startup.
    this.geoDbService.findCountries({
        limit: 1000,
        offset: 0
      })
      .retry(RestConstants.MAX_RETRY)
      .do(
        (response: GeoResponse<CountrySummary[]>) => {
          Array.prototype.push.apply(this.allCountries, response.data);
        }
      )
      .subscribe();
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

  filterCountries(countryName: string) {
    const nameFilter: string = countryName.toLowerCase();

    return this.allCountries.filter(country => country.name.toLowerCase().indexOf(nameFilter) === 0);
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
