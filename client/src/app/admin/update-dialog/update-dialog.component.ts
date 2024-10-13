import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrl: './update-dialog.component.css'
})
export class UpdateDialogComponent implements OnInit {
  formGroup: FormGroup = this.fb.group({});
  // Categories dict
  categories = [
    { value: 'Medical', viewValue: 'Medical' },
    { value: 'Education', viewValue: 'Education' },
    { value: 'Crisis Relief', viewValue: 'Crisis Relief' },
    { value: 'Animal', viewValue: 'Animal' },
    { value: 'Social Impact', viewValue: 'Social Impact' },
  ];
  actives = [
    { value: '1', viewValue: 'Active' },
    { value: '0', viewValue: 'Inactive' },
  ];


  constructor(
    private dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public fundraiser: any,
    private fb: FormBuilder,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      ORGANIZER: [this.fundraiser.ORGANIZER, Validators.required],
      CAPTION: [this.fundraiser.CAPTION, Validators.required],
      TARGET_FUNDING: [this.fundraiser.TARGET_FUNDING, Validators.required],
      CURRENT_FUNDING: [this.fundraiser.CURRENT_FUNDING, Validators.required],
      CITY: [this.fundraiser.CITY, Validators.required],
      Category: [this.fundraiser.category_name, Validators.required],
      ACTIVE: [this.fundraiser.ACTIVE, Validators.required],
      
    });
    this.formGroup.patchValue(this.fundraiser);
  }

  updateFundraiser(): void {
    if (this.formGroup.valid) {
      // this.dialogRef.close(this.formGroup.value);
      const updatedFundraiser = { ...this.fundraiser, ...this.formGroup.value };
      this.dataService.putFundraiser(updatedFundraiser).subscribe({
        next: (response) => {
          // 处理成功的响应
          console.log('Fundraiser updated successfully', response);
          this.dialogRef.close(true);
        },
        error: (error) => {
          // 处理错误
          console.error('Error updating fundraiser', error);
        }
      });
    }

  }

  closeDialog() {
    this.dialogRef.close();
  }

}
