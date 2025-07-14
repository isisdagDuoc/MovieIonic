function loginPrev() {
  cy.viewport(600, 1024)
  cy.visit('/')
}

function enterLogin() {
  loginPrev()
  cy.get('#nombreUsuario').click().type('{selectall}enrique')
  cy.get('#password').click().type('1234')
  cy.contains('ion-button', 'Ingresar').click()
  cy.location().should('match', /\/home$/)
}

describe('Spec prueba', () => {  
  it('ingresa', () => {
    loginPrev()
  })

  describe('login', () => {
    it('correcto', () => {
      enterLogin()
    })

    it('incorrecto', () => {
      loginPrev()
      cy.get('#nombreUsuario').click().type('{selectall}aaa')
      cy.get('#password').click().type('xxxx')
      cy.contains('ion-button', 'Ingresar').click()
      cy.get('#errCont')
        .find('li')
        .should('have.text', 'No se encuentra un usuario con dicha contraseña.')
    })
  })

  /*
  describe('mascotas', () => {
    it('existen', () => {
      enterLogin()

      let nombresEsperados = ['Ada', "Flaco", "Willy", "Martina"];
      //let nombresEsperados = ["Flaco", 'Ada' , "Willy", "Martina"];

      cy.get('app-mascota-card').
        should('have.length', 4).
        each((card, index) => {
          cy.wrap(card).find("ion-card-title").should('have.text', nombresEsperados[index]);
        });
    })
  })
    */
})