import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  public searchTerm: string;

  dataSourceUrl = '/api/product/';

  getData(endPoint: string, params?: any): Observable<any> {
    endPoint = encodeURI(endPoint);
    return this.http.get<any>(environment.BACKEND_API_URL + this.dataSourceUrl + endPoint, { params });
  }

  async getDataFromSearchBar(searchTerm: string): Promise<any> {
    console.log(environment.BACKEND_API_URL + this.dataSourceUrl);
    return await this.http.get<any>(environment.BACKEND_API_URL + '/api/searchBar/' + searchTerm).toPromise();
  }
}
