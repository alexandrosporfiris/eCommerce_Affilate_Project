import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  dataSourceUrl = '/api/product/';

  getData(endPoint: string, params?: any): Observable<any> {
    endPoint = encodeURI(endPoint);
    console.log(environment.BACKEND_API_URL + this.dataSourceUrl + endPoint, { params });
    return this.http.get<any>(environment.BACKEND_API_URL + this.dataSourceUrl + endPoint, { params });
  }
}
