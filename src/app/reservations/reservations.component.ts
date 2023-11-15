import { Component, OnInit } from '@angular/core';
import { ReservationsService } from './reservation.service';
import { ClientsService } from '../clients/clients.service';
import { CarService } from '../cars/car.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  constructor(
    private reservationService: ReservationsService, 
    private clientService: ClientsService,
    private carService: CarService) { }

  clients: any = [];
  cars: any = [];

  reservations: any = [];
  reservation: any = {
    carId: 0,
    culientId: 0,
    start: '',
    end: '',
  }

  ngOnInit(): void {
    this.getClients();
    this.getCars();
    this.getReservations();      
  }

  getClients() {
    this.clientService.getClients().subscribe((data: any) => {
      this.clients = data;
    });
  }

  getCars() {
    this.carService.getCars().subscribe((data: any) => {
      this.cars = data;
    });
  }

  getReservations() {
    this.reservationService.getReservations().subscribe((data: any) => {
      this.reservations = data;
    },
    (error: any) => {
      console.log(error);
    });
  }

  insertReservation() {
    this.reservationService.insertReservation(this.reservation).subscribe((data: any) => {
      this.reservation = data;
      console.log(data);
    },
    (error: any) => { 
      console.log(error);
    });
  }

}
