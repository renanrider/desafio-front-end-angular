describe('Pokémon details', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Load more pokemons', () => {
    cy.get('[ng-reflect-pokemon-type="normal"] > a > .flex').click();
    cy.get('[data-testid="pokemon-cards"]')
      .children()
      .should('have.length', 10);
    cy.get('[data-testid="load-pokemons"]').click();
    cy.get('[data-testid="pokemon-cards"]')
      .children()
      .should('have.length', 20);
  });

  it('Back to the pokémon list page', () => {
    cy.get('[ng-reflect-pokemon-type="normal"] > a > .flex').click();
    cy.wait(300);
    cy.url().should('include', '/normal');
    cy.wait(300);
    cy.get('[data-testid="back-button"]').click();
    cy.url().should('include', '/pokemon-list');
  });
});
