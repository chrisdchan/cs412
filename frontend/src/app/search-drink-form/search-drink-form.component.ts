import { Component } from '@angular/core';
import * as jsonData from '../../assets/vodka.json';
import { CocktailDataService } from '../cocktail-data.service';

@Component({
  selector: 'app-search-drink-form',
  standalone: true,
  imports: [],
  templateUrl: './search-drink-form.component.html',
  styleUrl: './search-drink-form.component.css'
})
export class SearchDrinkFormComponent {

  constructor(private cocktailDataService: CocktailDataService) {}

  submit() {
    let cocktails: any[] = jsonData.drinks.slice(0, 3);
    this.cocktailDataService.updateData(cocktails)
  }

  back() {
    this.cocktailDataService.updateData(null)
  }

}
