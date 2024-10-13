import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  
  fundraisers:any;
  fundraiser:any;

  // 构造函数中注入DataService
  constructor(
    private dataService: DataService,
    public dialog: MatDialog
    ) {}

  // ngOnInit生命周期钩子中调用DataService的方法
  ngOnInit() {
    this.dataService.getAllFundraisers().subscribe(
      (fundraisers) => {
        // 当数据成功返回时，将其赋值给data属性
        this.fundraisers=  fundraisers;
      },
      (error) => {
        // 处理错误情况
        console.error('Error fetching data: ', error);
      }
    );
  }

  deleteFundraiser(fundraiser:any){


  }

  openUpdateDialog(fundraiser:any) {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      width: '850px',
      data: fundraiser
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // 处理更新后的数据
        console.log('Updated fundraiser:', result);
      }
    });
  }

}
