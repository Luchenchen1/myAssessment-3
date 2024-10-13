import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }


  getData(): Observable<any> {
    // 替换以下URL为你的API端点
    return this.http.get('http://localhost:3000/fundraisers');
  }

  searchFundraisers(criteria: any): Observable<any[]> {
    const params = this.serializeCriteria(criteria);
    // 反引号构建url
    return this.http.get<any[]>(`http://localhost:3000/search?${params}`);
  }

  //构建查询url
  private serializeCriteria(criteria: any): string {
    const params = new URLSearchParams();
    if (criteria.organizer) params.append('organizer', criteria.organizer);
    if (criteria.city) params.append('city', criteria.city);
    console.log(criteria.selectedCategory);
    if (criteria.selectedCategory) params.append('category', criteria.selectedCategory); 
 
    return params.toString();
  }

  getFundraiser(fundraiserId: string): Observable<any> {
    console.log("data service fid:",fundraiserId);
    // 替换为实际的API端点
    return this.http.get(`http://localhost:3000/fundraiser/${fundraiserId}`);
  }

}
