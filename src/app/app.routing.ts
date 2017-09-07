import {Routes} from "@angular/router";

import {FindCitiesComponent} from "./components/find-cities/find-cities.component";
import {AutosuggestCitiesComponent} from "./components/autosuggest-cities/autosuggest-cities.component";

export const APP_ROUTES: Routes = [
  {path: "", component: AutosuggestCitiesComponent},
  {path: "home", component: AutosuggestCitiesComponent},
  {path: "find-cities", component: FindCitiesComponent}
];
