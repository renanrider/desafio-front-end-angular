import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { HeaderComponent } from '../shared/components/header/header.component';
import { DetailsPokemon, Pokemon } from './pokemon.interface';
import { CardDetailsComponent } from './card-details/card-details.component';
import { CardDetailsSkeletonComponent } from './components/card-details-skeleton/card-details-skeleton.component';
import { PokemonDetailsService } from './pokemon-details.service';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss',
  imports: [
    CommonModule,
    HeaderComponent,
    CardDetailsComponent,
    CardDetailsSkeletonComponent,
  ],
})
export class PokemonDetailsComponent implements OnInit {
  currentIndex = 0;
  pokemonsData: Pokemon[] = [];
  pokemons: Pokemon[] = [];
  pokemonId!: number;
  pokemonType!: string;
  cardSkeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(
    private pokemonDetailsService: PokemonDetailsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const paramMap = this.route.snapshot.paramMap;
    this.pokemonType = paramMap.get('type') || '';
    const extras = this.router.getCurrentNavigation()?.extras.state || {};
    const { id } = extras;
    this.pokemonId = id;
  }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    if (!this.pokemonId) return;
    this.pokemonDetailsService
      .getAllPokemonDetails(this.pokemonId)
      .pipe(
        tap((detailsPokemon: DetailsPokemon) => {
          detailsPokemon.pokemon.forEach((pokemonData: Pokemon) => {
            pokemonData.pokemon.thumbnail = this.generateThumbnailUrl(
              pokemonData.pokemon.url
            );
          });
        })
      )
      .subscribe((pokemonDetails) => {
        this.pokemonsData = pokemonDetails.pokemon;
        this.loadPokemons();
      });
  }

  extractIdFromUrl(url: string): string | undefined {
    const regex: RegExp = /\/(\d+)\/$/;
    const match: RegExpExecArray | null = regex.exec(url);
    return match?.[1];
  }

  generateThumbnailUrl(url: string): string {
    const id = this.extractIdFromUrl(url);
    return `${environment.baseUrlImages}/${id}.png`;
  }

  loadPokemons(): void {
    const endIndex = Math.min(this.currentIndex + 10, this.pokemonsData.length);
    for (let index = this.currentIndex; index < endIndex; index++) {
      const currentPokemon = this.pokemonsData[index];
      this.pokemons.push(currentPokemon);
    }
    this.currentIndex = endIndex;
  }
}
