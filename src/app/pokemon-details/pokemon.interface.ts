export interface DetailsPokemon {
  pokemon: [
    {
      pokemon: {
        name: string;
        url: string;
        thumbnail?: string;
      };
    }
  ];
}
