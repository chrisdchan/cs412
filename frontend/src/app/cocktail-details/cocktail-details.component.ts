import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as jsonData from '../../assets/vodka.json';
import { CocktailDataService } from '../cocktail-data.service';

@Component({
  selector: 'app-cocktail-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cocktail-details.component.html',
  styleUrl: './cocktail-details.component.css'
})
export class CocktailDetailsComponent implements OnInit {
  cocktails: any;

  constructor(private cocktailDataService: CocktailDataService) {}

  ngOnInit(): void {
    this.cocktailDataService.currentData.subscribe(updatedData => {
      this.cocktails = updatedData;
    }) 
  }
}
