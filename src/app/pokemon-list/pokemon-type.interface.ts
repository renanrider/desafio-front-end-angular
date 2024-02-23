export interface PokemonType {
  count: number;
  next: null;
  previous: null;
  results: [
    {
      name: string;
      url: string;
    }
  ];
}
