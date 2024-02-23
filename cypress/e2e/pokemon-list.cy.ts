describe('Pokémon list', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Navigate to the pokemon types page', () => {
    cy.url().should('include', '/pokemon-list');
  });

  it('Find the first card and the name include normal', () => {
    cy.get('[ng-reflect-pokemon-type="normal"] > a > .flex').contains('normal');
  });

  it('Click on first type and navigate to the page pokemon-type/:type', () => {
    cy.get('[ng-reflect-pokemon-type="normal"] > a > .flex').click();
    cy.wait(300);
    cy.url().should('include', '/normal');
  });
});
