import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PokemonDetailsService } from './pokemon-details.service';
import { DetailsPokemon } from './pokemon.interface';
import { environment } from '../../environments/environment';

describe('PokemonDetailsService', () => {
  let service: PokemonDetailsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PokemonDetailsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return pokémon list when calling getAllPokemonDetails', () => {
    const pokemons: DetailsPokemon = {
      data: [],
    };
    const pokemonId = 1;

    service
      .getAllPokemonDetails(pokemonId)
      .subscribe((detailsPokemon: DetailsPokemon) => {
        expect(detailsPokemon.data).toEqual(pokemons.data);
      });

    const req = httpMock.expectOne(`${environment.apiUrl}/type/${pokemonId}`);
    expect(req.request.method).toBe('GET');
    req.flush(pokemons);
  });
});
