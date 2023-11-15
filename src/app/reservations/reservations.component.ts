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

  details: boolean = false;
  fieldButtom: string = 'Detalhar Reserva';

  detailsReservation: any = {
    detailClient: {},
    detailCar: {},
  };

  reservations: any = [];
  reservation: any = {
    carId: 0,
    culientId: 0,
    start: '',
    end: '',
  }

  ngOnInit(): void {
    this.getReservations();      
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
      this.getReservations();
      this.clearFields();
      // console.log(data);
    },
    (error: any) => { 
      console.log(error);
    });
  }

  carDetails(carId: number) {
    this.carService.getCarById(carId).subscribe((data: any) => {

      this.detailsReservation.detailCar = data;
    },
    (error: any) => {
      console.log(error);
    });
  }

  clientDetails(clientId: number) {
    this.clientService.getById(clientId).subscribe((data: any) => {
      this.detailsReservation.detailClient = data;
    },
    (error: any) => {
      console.log(error);
    });
  }

  showDetails(clientId: number, carId: number) {
    this.details = !this.details;
    this.fieldButtom = this.details ? 'Ocultar Detalhes' : 'Detalhar Reserva';
    this.carDetails(carId);
    this.clientDetails(clientId);
    // console.log(this.detailsReservation);
  }

  clearFields() {
    this.reservation = {
      carId: 0,
      culientId: 0,
      start: '',
      end: '',
    }
  }

}
