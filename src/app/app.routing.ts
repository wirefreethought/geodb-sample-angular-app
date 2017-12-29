import {Routes} from "@angular/router";

import {AutosuggestCitiesComponent} from "./components/autosuggest-cities/autosuggest-cities.component";
import {FindCitiesComponent} from "./components/find-cities/find-cities.component";
import {FindRegionCitiesComponent} from "./components/find-region-cities/find-region-cities.component";

export const APP_ROUTES: Routes = [
  {path: "", component: AutosuggestCitiesComponent, pathMatch: "full"},
  {path: "autosuggest-cities", component: AutosuggestCitiesComponent, pathMatch: "full"},
  {path: "find-cities", component: FindCitiesComponent, pathMatch: "full"},
  {path: "find-region-cities", component: FindRegionCitiesComponent, pathMatch: "full"}
];
