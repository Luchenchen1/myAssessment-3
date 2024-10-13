import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css'
})
export class DeleteDialogComponent {

  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public fundraiser: any,

  ) {}

  confirmDelete():void{
    console.log(this.fundraiser)
    this.dataService.deleteFundraiser(this.fundraiser).subscribe({
      next: (response) => {
        // 处理成功删除的情况
        console.log('Fundraiser deleted successfully', response);
        this.dialogRef.close(true);
      },
      error: (error) => {
        // 处理错误情况
        console.error('There was an error!', error);
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }



}
