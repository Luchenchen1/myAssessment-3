/*
 * @Descripttion: Web-A3
 * @Author: Zhujiayao & Luchenchen
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';//在路由中拿参数
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-fundraiser',
  templateUrl: './fundraiser.component.html',
  styleUrl: './fundraiser.component.css'
})
export class FundraiserComponent implements OnInit {

  fundraiser = {
    CAPTION: '',
    ORGANIZER: '',
    TARGET_FUNDING: 0,
    CURRENT_FUNDING: 0,
    CITY: '',
    category_name: ''
  };;
  fundraiserId: any = '';

  // 构造函数中注入DataService
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    // 从查询参数中获取筹款活动ID
    this.fundraiserId = this.route.snapshot.paramMap.get('id');
    console.log("fundraiser ts fid:", this.fundraiserId);
    // 获取筹款活动详情
    this.dataService.getFundraiser(this.fundraiserId).subscribe(
      (res) => {
        // 当数据成功返回时，将其赋值给data属性
        this.fundraiser = res;
        // console.log(this.fundraiser)
      },
      (error) => {
        // 处理错误情况
        console.error('Error fetching data: ', error);
      }
    );
  }

  // 捐赠按钮点击事件
  onDonate() {
    this.router.navigate(['/donation', this.fundraiserId]);
  }
}

