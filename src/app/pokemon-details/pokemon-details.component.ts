import { Component, OnInit } from '@angular/core';
import { PokemonDetailsService } from './pokemon-details.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { HeaderComponent } from '../shared/components/header/header.component';
import { DetailsPokemon } from './pokemon.interface';
import { CardDetailsComponent } from './card-details/card-details.component';
import { CardDetailsSkeletonComponent } from './components/card-details-skeleton/card-details-skeleton.component';

interface Pokemon {
  name: string;
  url: string;
  thumbnail?: string | undefined;
}

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
  pokemonDetails!: DetailsPokemon;
  pokemons: Pokemon[] = [];
  pokemonId!: number;
  id!: number;
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
    this.id = id;
  }

  ngOnInit(): void {
    if (!this.id) return;
    this.pokemonDetailsService
      .getAllPokemonDetails(this.id)
      .pipe(
        tap((pokemonDetails: DetailsPokemon) => {
          pokemonDetails.pokemon.forEach((pokemonDetail) => {
            pokemonDetail.pokemon.thumbnail = this.generateThumbnailUrl(
              pokemonDetail.pokemon.url
            );
          });
        })
      )
      .subscribe((pokemonDetails) => {
        this.pokemonDetails = pokemonDetails;
        this.loadPokemons();
      });
  }

  extractIdFromUrl(url: string): string | undefined {
    const regex: RegExp = /\/(\d+)\/$/;
    const match: RegExpExecArray | null = regex.exec(url);
    return match?.[0].split('/')[1];
  }

  generateThumbnailUrl(url: string): string {
    const id = this.extractIdFromUrl(url);
    return `${environment.baseUrlImages}/${id}.png`;
  }

  loadPokemons(): void {
    const endIndex = Math.min(
      this.currentIndex + 10,
      this.pokemonDetails.pokemon.length
    );
    for (let index = this.currentIndex; index < endIndex; index++) {
      const current = this.pokemonDetails.pokemon[index];
      this.pokemons.push(current.pokemon);
    }
    this.currentIndex = endIndex;
  }
}
