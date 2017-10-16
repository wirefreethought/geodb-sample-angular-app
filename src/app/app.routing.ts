import {Routes} from "@angular/router";

import {AutosuggestCitiesComponent} from "./components/autosuggest-cities/autosuggest-cities.component";
import {FindCitiesComponent} from "./components/find-cities/find-cities.component";
import {FindRegionCitiesComponent} from "./components/find-region-cities/find-region-cities.component";
import {SetApiKeyComponent} from "./components/set-api-key/set-api-key.component";

export const APP_ROUTES: Routes = [
  {path: "", component: SetApiKeyComponent},
  {path: "autosuggest-cities", component: AutosuggestCitiesComponent},
  {path: "find-cities", component: FindCitiesComponent},
  {path: "find-region-cities", component: FindRegionCitiesComponent},
  {path: "set-api-key", component: SetApiKeyComponent}
];
