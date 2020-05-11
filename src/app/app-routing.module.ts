import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAirportComponent } from './components/add-airport/add-airport.component';
import { EditAirportComponent } from './components/edit-airport/edit-airport.component';
import { AirportsListComponent } from './components/airports-list/airports-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add-airport' },
  { path: 'add-airport', component: AddAirportComponent },
  { path: 'edit-airport/:id', component: EditAirportComponent },
  { path: 'airports-list', component: AirportsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }