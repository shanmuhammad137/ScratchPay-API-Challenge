describe('Scratchpay API Tests', () => {
  describe('When User is Authorized', () => {
    let jwtToken;

    beforeEach(() => {
      // User login
      cy.request('POST', '/auth', {
        email: Cypress.env('API_USER_EMAIL'),
        password: Cypress.env('API_USER_PASSWORD')
      }).then((response) => {
        expect(response.status).to.equal(200);
        jwtToken = response.body.data.session.token;
      });
    });

    context('Scenario 1: Prevent user (without permission) from getting the list of email addresses', () => {
      it('Should prevent the user from accessing the list of email addresses for practice id 2', () => {
        cy.request({
          method: 'GET',
          url: '/clinics/2/emails',
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'User-Agent': Cypress.env('USER_AGENT')
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.equal(400);
          cy.wrap(response.body).should('have.property', 'ok').and('be.a', 'boolean').and('be.false');
          cy.wrap(response.body.data).should('have.a.property', 'error').and('include', 'User does not have permissions');
        });
      });
    });

    context('Scenario 2: Search for clinics with the word "veterinary" in their name', () => {
      it('Should succeed and return all clinics with the word "veterinary" in their name', () => {
        cy.request({
          method: 'GET',
          url: '/clinics?term=veterinary',
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'User-Agent': Cypress.env('USER_AGENT')
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.equal(200);
          cy.wrap(response.body.data).its('length').should('be.greaterThan', 0);
        });
      });
    });

    // Handling some extra Scenarios
    context('Scenario 3: Search term is not given', () => {
      it('Should fail and return a error message', () => {
        cy.request({
          method: 'GET',
          url: '/clinics',
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'User-Agent': Cypress.env('USER_AGENT')
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.equal(422);
          cy.wrap(response.body).should('have.a.property', 'error').and('include', 'term is a required parameter for this action');
        });
      });
    });
  });
  
  // Handling some extra Scenarios
  describe('When User is Unauthorized', () => {
    context('Scenario 4: Prevent user (Unauthorized) from getting the list of email addresses', () => {
      it('Should prevent the user from getting the list of email addresses of practice id 2 without login', () => {
        cy.request({
          method: 'GET',
          url: '/clinics/2/emails',
          headers: {
            'User-Agent': Cypress.env('USER_AGENT')
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.equal(401);
          cy.wrap(response.body).should('have.property', 'ok').and('be.a', 'boolean').and('be.false');
          cy.wrap(response.body.data).should('have.a.property', 'message').and('include', 'You need to be authorized for this action.');
        });
      });
    });

    context('Scenario 5: Prevent user (Unauthorized) from getting the list clinics with the word "veterinary" in their name', () => {
      it('Should prevent the user from getting the list clinics with the word "veterinary" in their name without login', () => {
        cy.request({
          method: 'GET',
          url: '/clinics?term=veterinary',
          headers: {
            'User-Agent': Cypress.env('USER_AGENT')
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.equal(401);
          cy.wrap(response.body).should('have.property', 'ok').and('be.a', 'boolean').and('be.false');
          cy.wrap(response.body.data).should('have.a.property', 'message').and('include', 'You need to be authorized for this action.');
        });
      });
    });
  });
});
