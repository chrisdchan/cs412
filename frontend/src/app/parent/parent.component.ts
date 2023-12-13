import { Component } from '@angular/core';
import { CocktailDataService } from '../cocktail-data.service';
import { CocktailDetailsComponent } from '../cocktail-details/cocktail-details.component';
import { SearchDrinkFormComponent } from '../search-drink-form/search-drink-form.component';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [CocktailDetailsComponent, SearchDrinkFormComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css'
})
export class ParentComponent {

}
