import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
 
  constructor(private http: HttpClient) {}


  getData(): Observable<any> {
    // 替换以下URL为你的API端点
    return this.http.get('http://localhost:3000/fundraisers');
  }



}
