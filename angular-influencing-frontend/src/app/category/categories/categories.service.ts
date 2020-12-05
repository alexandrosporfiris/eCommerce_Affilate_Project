import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  async getData(dataSourceUrl: string): Promise<any[]> {
    return await this.http.get<any[]>(dataSourceUrl).toPromise();
  }
}
