

function setupLoggedUser() {
  const userData = {
    username: 'Alice',
    email: 'test@gmail.com',
    password: '1234'
  };

  const users = [{
    username: userData.username,
    email: userData.email,
    password: userData.password
  }];

  cy.window().then((win) => {
    win.localStorage.setItem('users', JSON.stringify(users));
    win.localStorage.setItem('currentUser', JSON.stringify(userData));
    win.localStorage.setItem('isLoggedIn', 'true');
  });

  cy.log('usuario simulado en localstorage');
}

function goToHomeDirectly() {
  setupLoggedUser();
  cy.visit('/home');
}

describe('Pruebas de la Página de Películas', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport(600, 1024);
  });
 
  describe('Estructura de la página', () => {
    it('debe tener la estructura básica de Ionic', () => {
      goToHomeDirectly();
      
      cy.get('ion-header').should('exist');
      cy.get('ion-toolbar').should('exist');
      cy.get('ion-title').should('exist');
      cy.get('ion-content').should('exist');
      
    });

    it('debe manejar el clima si está disponible', () => {
      goToHomeDirectly();
      
      cy.get('body').then($body => {
        if ($body.find('ion-card:contains("Clima actual")').length > 0) {
          cy.get('ion-card').contains('Clima actual').should('exist');
        } 
      });
    });
  });
});
