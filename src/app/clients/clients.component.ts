import { Component, OnInit } from '@angular/core';
import { ClientsService } from './clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  constructor(private clientService:ClientsService) {}

  clients: any = [];
  client: any = {
    name: '',
    email: '',
  };

  ngOnInit(): void {
    this.getClients();
  }

  getClients() {
    this.clientService.getClients().subscribe((response: any) => {
      this.clients = response;
    },
    (error: any) => {
      console.log(error);
    });
  }

  insertClient() {
    //verifica se o email tem formato válido
    const regex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!regex.test(this.client.email)) {
      alert('Email inválido!');
      return;
    }

    this.clientService.insertClient(this.client).subscribe((response: any) => {
      alert('Cliente inserido com sucesso!');
      this.getClients();
    },
    (error: any) => {
      console.log(error);
    });
  }

}
