import {Routes} from "@angular/router";

import {AutosuggestCitiesComponent} from "./components/autosuggest-cities/autosuggest-cities.component";
import {FindCitiesComponent} from "./components/find-cities/find-cities.component";
import {FindRegionCitiesComponent} from "./components/find-region-cities/find-region-cities.component";
import {SetApiKeyComponent} from "./components/set-api-key/set-api-key.component";

export const APP_ROUTES: Routes = [
  {path: "", component: SetApiKeyComponent, pathMatch: "full"},
  {path: "autosuggest-cities", component: AutosuggestCitiesComponent, pathMatch: "full"},
  {path: "find-cities", component: FindCitiesComponent, pathMatch: "full"},
  {path: "find-region-cities", component: FindRegionCitiesComponent, pathMatch: "full"},
  {path: "set-api-key", component: SetApiKeyComponent, pathMatch: "full"}
];
