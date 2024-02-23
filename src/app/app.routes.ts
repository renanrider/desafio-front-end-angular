import { Routes } from '@angular/router';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'pokemon-list',
  },
  {
    path: 'pokemon-list',
    component: PokemonListComponent,
  },
];
