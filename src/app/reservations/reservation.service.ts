import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationsService {
  constructor(private http: HttpClient) {}

  private url = 'http://localhost:8080/api/reservations';

  public getReservations(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  public insertReservation(reservation: any): Observable<any> {
    return this.http.post<any>(this.url, reservation);
  }
}
