import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  //get active fundraisers
  getFundraisers(): Observable<any> {
    return this.http.get('http://localhost:3000/fundraisers');
  }

  //get all fundraisers
  getAllFundraisers(): Observable<any> {
    return this.http.get('http://localhost:3000/fundraisers');
  }


  //search fundraisers
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

  //getFundraiser by fid
  getFundraiser(fundraiserId: string): Observable<any> {
    console.log("data service fid:",fundraiserId);
    // 替换为实际的API端点
    return this.http.get(`http://localhost:3000/fundraiser/${fundraiserId}`);
  }


  postDonation(donation: any): Observable<any>{
    // format datetime for MySQL
    donation.date = this.formatDateForMySQL(donation.date);
    console.log(donation);
    return this.http.post('http://localhost:3000/donation',donation);
  }

  //format datetime
  private formatDateForMySQL(isoDate: string): string {
    return new Date(isoDate).toISOString().slice(0, 19).replace('T', ' ');
  }
}
