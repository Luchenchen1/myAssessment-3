import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrl: './add-dialog.component.css'
})
export class AddDialogComponent {
  fundraiserForm: FormGroup;
  // Categories dict
  categories = [
    { value: '1', viewValue: 'Medical' },
    { value: '2', viewValue: 'Education' },
    { value: '7', viewValue: 'Crisis Relief' },
    { value: '8', viewValue: 'Animal' },
    { value: '9', viewValue: 'Social Impact' },
  ];
  actives = [
    { value: '1', viewValue: 'Active' },
    { value: '0', viewValue: 'Inactive' },
  ];

  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    private formBuilder: FormBuilder,
    private dataService: DataService
  ) {
    this.fundraiserForm = this.formBuilder.group({
      ORGANIZER: ['', Validators.required],
      CAPTION: ['', Validators.required],
      TARGET_FUNDING: ['', Validators.required],
      CURRENT_FUNDING: ['', Validators.required],
      CITY: ['', Validators.required],
      Category: ['', Validators.required],
      ACTIVE: ['', Validators.required],

    });
  }

  onSubmit(): void {
    if (this.fundraiserForm.valid) {
      this.dataService.postFundraiser(this.fundraiserForm.value).subscribe({
        next: (response) => {
          console.log('Fundraiser created successfully', response);
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('There was an error!', error);
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
