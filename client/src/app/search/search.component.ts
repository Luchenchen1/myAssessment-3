import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

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
    selectedCategory: '' // 用于绑定选中的 category
  };
  fundraisers: any[] = [];
  error: boolean = false;
  categories: string[] = ['Education', 'Health', 'Environment', 'Animal Welfare']; // 示例类别

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
      },
      error: (error) => {
        console.error('Error fetching fundraisers:', error);
        this.error = true;
      }
    });
  }

  clearCheckboxes() {
    this.criteria.organizer = '';
    this.criteria.city = '';
    this.criteria.categories = [];
  }

}
