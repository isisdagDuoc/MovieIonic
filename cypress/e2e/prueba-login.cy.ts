function loginPrev() {
  cy.viewport(600, 1024)
  cy.visit('/')
  cy.get('#nombreUsuario').should('be.visible')
}

function setupValidUser() {  
  cy.log('🚀 Configurando usuario de prueba usando registro real...');
  
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
  
  // Verificar que los campos se llenaron correctamente
  cy.get('#nombreUsuario input').should('have.value', validUser.username);
  cy.get('#correoUsuario input').should('have.value', validUser.email);
  cy.get('#password input').should('have.value', validUser.password);
  cy.get('#confirmPassword input').should('have.value', validUser.confirmPassword);
  
  cy.contains('ion-button', 'Registrarse').click();
  cy.wait(2000);
  
  // Manejar respuesta del registro
  cy.get('body').then($body => {
    if ($body.find('.ion-text-success').length > 0) {
      cy.log('✅ Usuario registrado exitosamente');
    } else if ($body.find('.ion-text-danger').length > 0) {
      cy.get('.ion-text-danger').then($error => {
        const errorText = $error.text().trim();
        cy.log(`⚠️ Mensaje del registro: ${errorText}`);
        if (errorText.includes('Ya existe')) {
          cy.log('✅ Usuario ya existe, continuando con las pruebas');
        }
      });
    }
  });
  
  cy.log('✅ Usuario de prueba preparado');
}

function fillIonicInputForced(selector: string, value: string) {
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

function enterLogin(username = 'Alice', email = 'test@gmail.com', password = '1234') {
  setupValidUser();
  loginPrev()
  
  cy.window().then((win) => {
    const users = JSON.parse(win.localStorage.getItem('users') || '[]');
  })
  
  
  fillIonicInputForced('#nombreUsuario', username)
  cy.wait(500)
  
  fillIonicInputForced('#correoUsuario', email)
  cy.wait(500)
  
  fillIonicInputForced('#password', password)
  cy.wait(500)
  
  cy.get('#nombreUsuario input').should('have.value', username)
  cy.get('#correoUsuario input').should('have.value', email)
  cy.get('#password input').should('have.value', password)
  
  cy.get('#errCont').should('be.empty')
  
  cy.contains('ion-button', 'Ingresar').click()
  
  cy.wait(3000)
  
  cy.get('#errCont').then($errCont => {
    if ($errCont.children().length > 0) {
      cy.get('#errCont li').each($error => {
        cy.log($error.text())
      })
      const errorText = $errCont.text().trim()
      
    }
  })
  
  cy.url().then(url => {
    cy.log(`URL: ${url}`)
  })
  
  cy.get('#errCont').then($errCont => {
    if ($errCont.children().length === 0) {
      cy.url().should('include', '/home', { timeout: 15000 })
    } else {
      throw new Error(`Login falló: ${$errCont.text().trim()}`)
    }
  })
}

function attemptLogin(username: string, email: string, password: string) {
  fillIonicInputForced('#nombreUsuario', username)
  fillIonicInputForced('#correoUsuario', email)
  fillIonicInputForced('#password', password)
  cy.contains('ion-button', 'Ingresar').click()
}

function testLoginError(username: string, email: string, password: string, expectedError: string) {
  loginPrev()
  attemptLogin(username, email, password)
  cy.get('#errCont').find('li').should('contain.text', expectedError)
}

const LOGIN_TEST_DATA = {
  valid: {
    username: 'Alice',
    email: 'test@gmail.com', 
    password: '1234'
  },
  errors: [
    {
      name: 'usuario y contraseña inválidos',
      data: { username: 'aaa', email: 'test@test.com', password: 'xxxx' },
      expectedError: 'Usuario o contraseña incorrectos'
    },
    {
      name: 'falta nombre',
      data: { username: '', email: 'test@test.com', password: '1234' },
      expectedError: 'Debe ingresar un nombre de usuario'
    },
    {
      name: 'falta correo',
      data: { username: 'test', email: '', password: '1234' },
      expectedError: 'Debe ingresar un correo válido'
    },
    {
      name: 'contraseña muy corta',
      data: { username: 'test', email: 'test@test.com', password: '12' },
      expectedError: 'La contraseña debe tener al menos 4 caracteres.'
    }
  ]
};

describe('Spec prueba', () => {  
  beforeEach(() => {
    cy.clearLocalStorage()
  })

  it('ingresa', () => {
    loginPrev()
  })

  describe('login', () => {
    it('correcto', () => {
      const { username, email, password } = LOGIN_TEST_DATA.valid;
      enterLogin(username, email, password);
    })

    LOGIN_TEST_DATA.errors.forEach(({ name, data, expectedError }) => {
      it(`incorrecto - ${name}`, () => {
        testLoginError(data.username, data.email, data.password, expectedError);
      });
    });
  })
})