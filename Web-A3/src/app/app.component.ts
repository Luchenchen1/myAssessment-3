import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Fundraiser {
  CAPTION: string;
  ORGANIZER: string;
  TARGET_FUNDING: number;
  CURRENT_FUNDING: number;
  CITY: string;
  category_name: string;
  imageUrl?: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  welcomeMessage: string = "Welcome to Our Funny Funding!";
  inspiringStories: string = "Your support fuels our journey forward.";
  contactInfo: string = "Contact us: info@nonprofit.org";
  activeFundraisers: Fundraiser[] = [];

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    // 你可以在 ngOnInit 方法或其他任何方法中使用 this.http 来发送请求
    this.http.get<Fundraiser[]>('http://localhost:3000/fundraisers').subscribe({
        // 处理返回的数据
        next: (data: Fundraiser[]) => this.activeFundraisers = data,
        error: (error) => console.error('Error fetching active fundraisers:', error)
  }

      
    );
  }


}
