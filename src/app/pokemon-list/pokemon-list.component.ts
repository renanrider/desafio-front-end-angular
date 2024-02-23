import { Component, OnInit } from '@angular/core';
import { PokemonListService } from './pokemon-list.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PokemonType } from './pokemon-type.interface';
import { CardComponent } from './components/card/card.component';
import { CardSkeletonComponent } from './components/card-skeleton/card-skeleton.component';
import { HeaderComponent } from '../shared/components/header/header.component';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    CardComponent,
    CardSkeletonComponent,
    HeaderComponent,
  ],
})
export class PokemonListComponent implements OnInit {
  cardSkeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  pokemontypes!: PokemonType;

  constructor(private pokemonListService: PokemonListService) {}

  ngOnInit(): void {
    this.pokemonListService.getAllPokemonTypes().subscribe((pokemontypes) => {
      this.pokemontypes = pokemontypes;
    });
  }
}
