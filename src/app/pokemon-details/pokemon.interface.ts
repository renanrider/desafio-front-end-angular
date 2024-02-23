export interface Pokemon {
  pokemon: {
    name: string;
    url: string;
    thumbnail?: string;
  };
}

export interface DetailsPokemon {
  pokemon: Pokemon[];
}
