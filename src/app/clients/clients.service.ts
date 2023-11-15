import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(private http: HttpClient) {}

  private url = 'http://localhost:8080/api/clients';

  public getClients(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  public insertClient(client: any): Observable<any> {
    return this.http.post<any>(`${this.url}/insert`, client);
  }
}