import { Component, OnInit } from '@angular/core';
import { CarService } from './car.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit{
  constructor(private carService: CarService) {}

  cars: any = [];
  car: any = {
    model: '',
    year: 0,
    color: '',
    plate: '',
    brand: '',
    available: '', 
  }

  selectedFilter: string = '';

  ngOnInit() {
    this.getCars();
  }

  getCars() {
    this.carService.getCars().subscribe((response: any) => {
      this.cars = response;
    },
    (error: any) => {
      console.log(error);
    });
  }

  insertCar() {
    this.carService.insertCar(this.car).subscribe((response: any) => {
      alert('Carro inserido com sucesso!');
      this.getCars();
    },
    (error: any) => {
      console.log(error);
    });
  }

  removeCar(id: number) {
    this.carService.deleteCar(id).subscribe((response: any) => {
      alert('Carro removido com sucesso!');
      this.getCars();
    }
    ,
    (error: any) => {
      console.log(error);
      alert("Erro ao remover carro! Certifique-se de que ele não está reservado.");
    })
  }

  getAvailableCars() {
    this.carService.getAvailableCars().subscribe((response: any) => {
      this.cars = response;
    },
    (error: any) => {
      console.log(error);
      this.getCars();
    });
  }

  filterCars() {
// console.log(this.selectedFilter);
    if(this.selectedFilter == 'availables') {
      this.getAvailableCars();
    } else {
      this.getCars();
    }

}


}
