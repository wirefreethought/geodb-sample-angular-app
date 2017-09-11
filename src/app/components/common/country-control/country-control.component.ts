import {Component, Input, OnInit, Output} from "@angular/core";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

import {RestConstants} from "../../../common/rest-constants.class";
import {GeoResponse} from "../../../domain/common/geo-response.model";
import {Country} from "../../../domain/geo/country.model";

import {GeoDataService} from "../../../domain/geo/geo-data.service";

@Component({
  selector: "app-country-control",
  templateUrl: "./country-control.component.html",
  styleUrls: ["./country-control.component.css"]
})
export class CountryControlComponent implements OnInit {

  @Output("countryCode")
  countryCodeSubject = new BehaviorSubject<string>(null);

  countryControl = new FormControl();

  allCountries: Country[];
  filteredCountries: Observable<Country[]>;

  private _enabled: boolean;

  constructor(private geoDataService: GeoDataService) {
  }

  ngOnInit() {
    this.allCountries = [];

    this.filteredCountries = this.countryControl.valueChanges
      .startWith(null)
      .map(country => country ? this.filterCountries(country) : this.allCountries.slice());

    // We set a high limit to make sure we get all countries in a single call. This collection should be cached at app startup.
    this.geoDataService.findCountries(null, 1000, 0)
      .retry(RestConstants.MAX_RETRY)
      .do(
        (response: GeoResponse<Country[]>) => {
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
