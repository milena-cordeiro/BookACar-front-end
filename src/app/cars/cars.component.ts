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

  loading: boolean = false;

  ngOnInit() {
    this.getCars();
  }

  getCars() {
    this.loading = true;
    this.carService.getCars().subscribe((response: any) => {
      this.cars = response;
      this.clearFields();
    },
    (error: any) => {
      this.loading = false;
      console.log(error);
    });
  }

  insertCar() {
    //verifica se a placa informada tem formato válido
    const regex: RegExp = /^[A-Z]{3}[0-9]{4}$/;
    const placa: string = this.car.plate.toUpperCase();

    if(placa.length != 7 || !regex.test(placa)) {
      alert('Placa inválida!');
      return;
    }

    this.loading = true;
    this.carService.insertCar(this.car).subscribe((response: any) => {
      alert('Carro inserido com sucesso!');
      this.clearFields();
      this.getCars();
    },
    (error: any) => {
      this.loading = false;
      alert('Erro ao inserir carro! Preencha todos os campos corretamente.');
      // console.log(error);
    });
  }

  removeCar(id: number) {
    this.loading = true;
    this.carService.deleteCar(id).subscribe((response: any) => {
      alert('Carro removido com sucesso!');
      this.clearFields();
      this.getCars();
    }
    ,
    (error: any) => {
      // console.log(error);
      this.loading = false;
      alert("Erro ao remover carro! Certifique-se de que ele está Disponivel.");
    })
  }

  getAvailableCars() {
    this.carService.getAvailableCars().subscribe((response: any) => {
      this.cars = response;
    },
    (error: any) => {
      // console.log(error);
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

setAvailable() {
  if(this.car.available == 'true') {
    this.car.available = true;
  } else {  
    this.car.available = false;
  }
}


clearFields() {
  this.car.model = '';
  this.car.year = 0;
  this.car.color = '';
  this.car.plate = '';
  this.car.brand = '';
  this.car.available = '';
  this.loading = false;
}

}
