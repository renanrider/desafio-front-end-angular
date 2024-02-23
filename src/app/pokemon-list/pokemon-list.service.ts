import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonType } from './pokemon-type.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PokemonListService {
  constructor(private http: HttpClient) {}
  getAllPokemonTypes(): Observable<PokemonType> {
    return this.http.get<PokemonType>(`${environment.apiUrl}/type`);
  }
}
