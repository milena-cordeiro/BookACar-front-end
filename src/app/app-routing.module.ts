import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClientsComponent } from './clients/clients.component';
import { CarsComponent } from './cars/cars.component';
import { ReservationsComponent } from './reservations/reservations.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'clients', component: ClientsComponent},
  {path: 'cars', component: CarsComponent},
  {path: 'reservations', component: ReservationsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
