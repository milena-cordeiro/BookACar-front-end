import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService { 
  constructor(private http: HttpClient) {}

  private url = 'http://localhost:8080/api/cars';

  getCars(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  insertCar(car: any): Observable<any> {
    return this.http.post<any>(this.url, car);
  }

  deleteCar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

  getAvailableCars(): Observable<any> {
    return this.http.get<any>(`${this.url}/available`);
  }
}