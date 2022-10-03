describe('Index Page Functionality', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    cy.login('my-email@something.com', 'myPassword');
    cy.get('h1').contains('Yugi Explorer');
  });

  it('should see loading component', () => {
    cy.get('.loading').should('be.visible');
  });

  it('Should have initial Cards', () => {
    cy.get('.yugi-card').should('have.length', 15);
  });

  it('Should be able to load more cards', () => {
    cy.scrollTo('bottom');
    cy.get('.yugi-card', {
      timeout: 10000,
    }).should('have.length.greaterThan', 15);
  });

  it("Should be able to filter cards",()=>{
    cy.get("#search").type("Dark Magician")
    cy.get(".yugi-card").should("have.length.above",1)
  })
});

describe('See Cards Detail', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('Should see list cards', () => {
    cy.get('.yugi-card').should('have.length', 15);
  });
  it('Should be able click and see cards detail', () => {
    cy.get('.yugi-card').first().click();
    cy.contains('Ability').should('be.visible');
  });
});

describe('Deck functionality', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it("Should didn't have any deck", () => {
    cy.get('a span').contains('My Deck').click();
    cy.get('h1').should('contain.text', 'You have no card');
  });

  it('Should be able add card to deck', () => {
    cy.get('.action-deck').each((el, idx) => {
      if (idx < 10) {
        cy.wrap(el).click();
      }
    });

    cy.get('a span').contains('My Deck').click();
    cy.get('.yugi-card').should('have.length', 10);
  });

  it('Should be able remove card from deck', () => {
    cy.get('.action-deck').each((el, idx) => {
      if (idx < 5) {
        cy.wrap(el).click();
      }
    });

    cy.get('a span').contains('My Deck').click({
      timeout: 10000,
    });


    cy.wait(5000)

    cy.get(".action-deck").each((el)=>{
      cy.wrap(el).click()
    })

    cy.get('.yugi-card').should('have.length', 0);

  });
});

describe("Deck page functionality",()=>{
  it("Should be able to see detail from deck",()=>{
    cy.visit('/deck');
    cy.get("a span").contains("Explorer").click()
    cy.get('.action-deck').first().click();

    cy.get("a span").contains("My Deck").click()
    cy.get(".yugi-card").first().click()
    cy.contains("Ability").should("be.visible")

  })
})
