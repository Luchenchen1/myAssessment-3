import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  welcomeMessage: string = "Welcome to Our Funny Funding!";
  inspiringStories: string = "Your support fuels our journey forward.";
  contactInfo: string = "Contact us: info@nonprofit.org";
 
  data:any;

  // 构造函数中注入DataService
  constructor(private dataService: DataService) {}

  // ngOnInit生命周期钩子中调用DataService的方法
  ngOnInit() {
    this.dataService.getData().subscribe(
      (data) => {
        // 当数据成功返回时，将其赋值给data属性
        this.data= data;
      },
      (error) => {
        // 处理错误情况
        console.error('Error fetching data: ', error);
      }
    );
  }


}
