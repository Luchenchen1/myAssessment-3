import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';//在路由中拿参数
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrl: './donation.component.css'
})
export class DonationComponent {

  //初始化数据模型
  fundraiser = {
    CAPTION: '',
    ORGANIZER: '',
    TARGET_FUNDING: 0,
    CURRENT_FUNDING: 0,
    CITY: '',
    category_name: ''
  };;
  fundraiserId: any = '';
  donation = {
    amount: '',
    date:new Date().toISOString(),
    giver: '',
    fundraiserId: null
  };

  // 构造函数中注入DataService
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    // 从查询参数中获取筹款活动ID
    this.fundraiserId = this.route.snapshot.paramMap.get('id');
    console.log("fundraiser ts fid:", this.fundraiserId);
    // 获取筹款活动详情
    this.dataService.getFundraiser(this.fundraiserId).subscribe(
      (res) => {
        // 当数据成功返回时，将其赋值给fundraiser属性
        this.fundraiser = res;
      },
      (error) => {
        // 处理错误情况
        console.error('Error fetching data: ', error);
      }
    );
  }

  submitDonation(): void{
    //转换数据类型来判断
    if (parseInt(this.donation.amount) < 5) {
      alert('Minimum 5 AUD');
      return;
    }
    this.donation.fundraiserId = this.fundraiserId 
    
    this.dataService.postDonation(this.donation).subscribe(
      (response) => {
        alert('Thanks for your donation');
        console.log('Donation successful', response);
        // 重定向到筹款页面
      },
      (error) => {
        alert('An error occurred while submitting your donation.');
        // 处理错误，比如显示错误消息
        console.error('Donation failed', error);
      }
      
    );
  }

}
