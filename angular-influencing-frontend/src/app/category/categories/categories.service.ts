import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getData(dataSourceUrl: string): Observable<any[]> {
    console.log(dataSourceUrl);
    return this.http.get<any[]>(dataSourceUrl);
  }
}
