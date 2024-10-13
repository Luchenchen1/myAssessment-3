import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  criteria = {
    organizer: '',
    city: '',
    categories: [],
    selectedCategory: '' 
  };
  fundraisers: any[] = [];
  error: boolean = false;
  categories: string[] = ['Medical', 'Education', 'Crisis Relief', 'Animal','Social Impact' ];// Categories dict
  searchSuccessful: boolean = false;
  

  // 构造函数中注入DataService
  constructor(private dataService: DataService) { }

  search() {
    if (!this.criteria.organizer && !this.criteria.city && !this.criteria.selectedCategory ){
      alert('Please select at least one criteria.');
      return;
    }

    this.dataService.searchFundraisers(this.criteria).subscribe({
      next: (data) => {
        this.fundraisers = data;
        this.error = this.fundraisers.length === 0;
        this.searchSuccessful = true;
      },
      error: (error) => {
        console.error('Error fetching fundraisers:', error);
        this.error = true;
        this.searchSuccessful = false;
      }
    });
  }


  clearCheckboxes() {
    this.criteria.organizer = '';
    this.criteria.city = '';
    this.criteria.categories = [];
  }

}
