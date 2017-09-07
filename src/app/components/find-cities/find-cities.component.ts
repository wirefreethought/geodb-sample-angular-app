import { Component, OnInit } from "@angular/core";
import {GeoDataService} from "../../domain/geo/geo-data.service";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {City} from "../../domain/geo/city.model";
import {GeoResponse} from "../../domain/common/geo-response.model";
import {Country} from "../../domain/geo/country.model";
import {AutoSuggestConstants} from "../../common/autosuggest-constants.class";
import {RestConstants} from "../../common/rest-constants.class";

@Component({
  selector: "app-search-cities-component",
  templateUrl: "./find-cities.component.html",
  styleUrls: ["./find-cities.component.css"]
})
export class FindCitiesComponent implements OnInit {

  CITY_RESULTS_COLUMNS_NO_COUNTRY: Array<any> = [{name: "ID"}, {name: "City"}, {name: "Region"}];
  CITY_RESULTS_COLUMNS: Array<any> = [...this.CITY_RESULTS_COLUMNS_NO_COUNTRY, {name: "Country"}];

  countryControl: FormControl;
  allCountries: Country[];
  filteredCountries: Observable<Country[]>;

  cityControl: FormControl;
  minPopulationControl: FormControl;

  cityResultsColumns = [];
  cityResultsCurrent = new Array<City>();
  cityResultsTotalCount = 0;
  cityResultsCurrentPage = 0;
  cityResultsPageSize = RestConstants.MAX_PAGING_LIMIT;

  constructor(private geoDataService: GeoDataService) { }

  ngOnInit() {
    // Init countries.
    this.initCountries();

    this.cityControl = new FormControl();
    this.cityControl.disable();

    this.minPopulationControl = new FormControl();
    this.minPopulationControl.disable();

    this.refreshResults();
  }

  filterCountries(countryName: string) {
    const nameFilter: string = countryName.toLowerCase();

    return this.allCountries.filter(country => country.name.toLowerCase().indexOf(nameFilter) === 0);
  }

  initCountries() {
    this.countryControl = new FormControl();
    this.countryControl.disable();

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

  setCityResultsPage(page: number) {
    this.cityResultsCurrentPage = page;

    const offset = page * this.cityResultsPageSize;

    const namePrefix = this.cityControl.enabled ? this.cityControl.value : null;
    const countryCode = this.countryControl.enabled ? this.countryControl.value : null;
    const minPopulation = this.minPopulationControl.enabled ? this.minPopulationControl.value : null;

    this.cityResultsColumns = countryCode ? this.CITY_RESULTS_COLUMNS_NO_COUNTRY : this.CITY_RESULTS_COLUMNS;

    this.geoDataService.findCities(namePrefix, countryCode, minPopulation, this.cityResultsPageSize, offset)
      .retry(RestConstants.MAX_RETRY)
      .subscribe(
        (response: GeoResponse<City[]>) => {
          this.cityResultsTotalCount = response.metadata.totalCount;

          this.cityResultsCurrent = [...response.data];
        });
  }

  refreshResults() {
    this.setCityResultsPage(0);
  }
}
