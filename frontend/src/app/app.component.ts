import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CocktailDetailsComponent } from './cocktail-details/cocktail-details.component';
import { SearchDrinkFormComponent } from './search-drink-form/search-drink-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CocktailDetailsComponent, SearchDrinkFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}