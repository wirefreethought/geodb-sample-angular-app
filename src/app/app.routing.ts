import {Routes} from "@angular/router";

import {FindCitiesComponent} from "./components/find-cities/find-cities.component";
import {AutosuggestCitiesComponent} from "./components/autosuggest-cities/autosuggest-cities.component";
import {FindRegionCitiesComponent} from "./components/find-region-cities/find-region-cities.component";

export const APP_ROUTES: Routes = [
  {path: "", component: AutosuggestCitiesComponent},
  {path: "home", component: AutosuggestCitiesComponent},
  {path: "find-cities", component: FindCitiesComponent},
  {path: "find-region-cities", component: FindRegionCitiesComponent}
];
