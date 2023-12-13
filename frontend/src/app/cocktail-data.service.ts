import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CocktailDataService {
  private dataSource = new BehaviorSubject<any>(null);
  private backendURL = 'http://localhost:3000'
  currentData = this.dataSource.asObservable();

  constructor(private http: HttpClient){}

  updateData(data: any) {
    this.dataSource.next(data)
  }

  searchDrinks(searchTerm: string): any {
    this.http.post(`${this.backendURL}/search-cocktail-2`, {cocktail: searchTerm }).subscribe({
      next: (res) => {
        let data = JSON.parse(JSON.stringify(res))
        let cocktails = data['data']
        this.dataSource.next(cocktails)
      },
      error: (err) => {
        console.error('Error: ', err);
      }
    })
  }
}
