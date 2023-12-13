import { Component } from '@angular/core';
import * as jsonData from '../../assets/vodka.json';
import { CocktailDataService } from '../cocktail-data.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-drink-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-drink-form.component.html',
  styleUrl: './search-drink-form.component.css'
})
export class SearchDrinkFormComponent {

  searchForm = new FormGroup({
    searchTerm: new FormControl('', [Validators.required, Validators.minLength(1)])
  });

  constructor(private cocktailDataService: CocktailDataService) {}

  onSubmit() {
    if(this.searchForm.valid) {
      const searchTerm = this.searchForm.value.searchTerm ?? ''
      const cocktails: any[] = this.cocktailDataService.searchDrinks(searchTerm)
      this.cocktailDataService.updateData(cocktails)
    }
  }

  submit() {
    let cocktails: any[] = jsonData.drinks.slice(0, 3);
    this.cocktailDataService.updateData(cocktails)
  }

  back() {
    this.cocktailDataService.updateData(null)
  }

}
