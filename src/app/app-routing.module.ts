import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AutosuggestPlacesComponent} from './components/autosuggest-places/autosuggest-places.component';
import {FindPlacesComponent} from './components/find-places/find-places.component';
import {FindRegionPlacesComponent} from './components/find-region-places/find-region-places.component';

const routes: Routes = [
  {path: '', component: AutosuggestPlacesComponent, pathMatch: 'full'},
  {path: 'autosuggest-places', component: AutosuggestPlacesComponent, pathMatch: 'full'},
  {path: 'find-places', component: FindPlacesComponent, pathMatch: 'full'},
  {path: 'find-region-places', component: FindRegionPlacesComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
