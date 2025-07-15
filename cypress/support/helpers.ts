
export function fillIonicInputForced(selector: string, value: string) {
  cy.get(selector).click()
  cy.wait(100)
  
  if (value && value.trim() !== '') {
    cy.get(selector).within(() => {
      cy.get('input').should('not.be.disabled')
      cy.get('input').clear()
      cy.get('input').type(value, { force: true })
    })
    cy.get(selector).within(() => {
      cy.get('input').trigger('input').trigger('blur')
    })
  } else {
    cy.get(selector).within(() => {
      cy.get('input').should('not.be.disabled')
      cy.get('input').clear()
    })
  }
}

export function setupValidUser() {    
  cy.visit('/agregar');
  cy.get('#nombreUsuario').should('be.visible');
  
  const validUser = {
    username: 'Alice',
    email: 'test@gmail.com', 
    password: '1234',
    confirmPassword: '1234'
  };
  
  fillIonicInputForced('#nombreUsuario', validUser.username);
  cy.wait(300);
  
  fillIonicInputForced('#correoUsuario', validUser.email);
  cy.wait(300);
  
  fillIonicInputForced('#password', validUser.password);
  cy.wait(300);
  
  fillIonicInputForced('#confirmPassword', validUser.confirmPassword);
  cy.wait(300);
  
  cy.get('#nombreUsuario input').should('have.value', validUser.username);
  cy.get('#correoUsuario input').should('have.value', validUser.email);
  cy.get('#password input').should('have.value', validUser.password);
  cy.get('#confirmPassword input').should('have.value', validUser.confirmPassword);
  
  cy.contains('ion-button', 'Registrarse').click();
  cy.wait(2000);
  
  // Manejar respuesta del registro
  cy.get('body').then($body => {
    if ($body.find('.ion-text-success').length > 0) {
      cy.log('Usuario registrado exitosamente');
    } else if ($body.find('.ion-text-danger').length > 0) {
      cy.get('.ion-text-danger').then($error => {
        const errorText = $error.text().trim();
        cy.log(`mensaje del registro: ${errorText}`);
        if (errorText.includes('Ya existe')) {
          cy.log('usuario ya existe, continuando con las pruebas');
        }
      });
    }
  });
  
}

export function setupLoggedUserInStorage() {
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

  cy.log('✅ Usuario simulado en localStorage');
}

export function goToPageDirectly(page: string = '/home') {
  setupLoggedUserInStorage();
  cy.visit(page);
  cy.wait(1000);
  cy.log(`✅ Navegado directamente a ${page}`);
}

export function doFullLogin(username = 'Alice', email = 'test@gmail.com', password = '1234') {
  setupValidUser();
  
  cy.visit('/');
  cy.get('#nombreUsuario').should('be.visible');
  
  fillIonicInputForced('#nombreUsuario', username);
  cy.wait(500);
  
  fillIonicInputForced('#correoUsuario', email);
  cy.wait(500);
  
  fillIonicInputForced('#password', password);
  cy.wait(500);
  
  cy.get('#nombreUsuario input').should('have.value', username);
  cy.get('#correoUsuario input').should('have.value', email);
  cy.get('#password input').should('have.value', password);
  
  cy.get('#errCont').should('be.empty');
  cy.contains('ion-button', 'Ingresar').click();
  
  cy.wait(3000);
  cy.url().should('include', '/home', { timeout: 15000 });
}
