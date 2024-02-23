import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DetailsPokemon } from './pokemon.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonDetailsService {
  constructor(private http: HttpClient) {}
  getAllPokemonDetails(pokemonId: number): Observable<DetailsPokemon> {
    return this.http.get<DetailsPokemon>(
      `${environment.apiUrl}/type/${pokemonId}`
    );
  }
}
