import { LoginFormComponent } from '../../src/app/components/login-form/login-form.component'
import { DataService } from '../../src/app/services/dataservice.service'
import { Router } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { Usuario } from '../../src/app/services/DB/models/usuario'

describe('LoginFormComponent - Pruebas Unitarias', () => {
  // Datos de prueba
  const usuarioTestData: Usuario = {
    id: 1,
    name: 'Juan Pérez',
    email: 'juan@test.com',
    password: '1234',
    peliculas: [],
    comentarios: []
  }

  it('debe renderizarse correctamente', () => {
    const mockDataService = {
      init: cy.stub().resolves(),
      obtenerUsuario: cy.stub().resolves(usuarioTestData)
    }

    const mockRouter = {
      navigate: cy.stub()
    }

    cy.mount(LoginFormComponent, {
      imports: [IonicModule.forRoot(), FormsModule, CommonModule],
      declarations: [LoginFormComponent],
      providers: [
        { provide: DataService, useValue: mockDataService },
        { provide: Router, useValue: mockRouter }
      ]
    })

    cy.get('.login-container').should('exist')
    cy.get('#nombreUsuario').should('exist')
    cy.get('#correoUsuario').should('exist')
    cy.get('#password').should('exist')
    cy.get('ion-button').contains('Iniciar Sesión').should('exist')
  })

  it('debe mostrar errores de validación cuando los campos están vacíos', () => {
    const mockDataService = {
      init: cy.stub().resolves(),
      obtenerUsuario: cy.stub().resolves(usuarioTestData)
    }

    const mockRouter = {
      navigate: cy.stub()
    }

    cy.mount(LoginFormComponent, {
      imports: [IonicModule.forRoot(), FormsModule, CommonModule],
      declarations: [LoginFormComponent],
      providers: [
        { provide: DataService, useValue: mockDataService },
        { provide: Router, useValue: mockRouter }
      ]
    })

    cy.get('ion-button').contains('Iniciar Sesión').click()

    cy.get('.error-message').should('exist')
    // The component shows the last validation error (password) when all fields are empty
    cy.get('.error-message').should('contain.text', 'La contraseña debe tener al menos 4 caracteres')
  })

  it('debe validar que la contraseña tenga al menos 4 caracteres', () => {
    const mockDataService = {
      init: cy.stub().resolves(),
      obtenerUsuario: cy.stub().resolves(usuarioTestData)
    }

    const mockRouter = {
      navigate: cy.stub()
    }

    cy.mount(LoginFormComponent, {
      imports: [IonicModule.forRoot(), FormsModule, CommonModule],
      declarations: [LoginFormComponent],
      providers: [
        { provide: DataService, useValue: mockDataService },
        { provide: Router, useValue: mockRouter }
      ]
    })

    cy.get('#nombreUsuario').type('Juan')
    cy.get('#correoUsuario').type('juan@test.com')
    cy.get('#password').type('123')

    cy.get('ion-button').contains('Iniciar Sesión').click()

    cy.get('.error-message').should('contain.text', 'La contraseña debe tener al menos 4 caracteres')
  })

  it('debe realizar login exitoso con credenciales válidas', () => {
    const mockDataService = {
      init: cy.stub().resolves(),
      obtenerUsuario: cy.stub().resolves(usuarioTestData)
    }

    const mockRouter = {
      navigate: cy.stub()
    }

    cy.mount(LoginFormComponent, {
      imports: [IonicModule.forRoot(), FormsModule, CommonModule],
      declarations: [LoginFormComponent],
      providers: [
        { provide: DataService, useValue: mockDataService },
        { provide: Router, useValue: mockRouter }
      ]
    })

    cy.get('#nombreUsuario').type('Juan Pérez')
    cy.get('#correoUsuario').type('juan@test.com')
    cy.get('#password').type('1234')

    cy.get('ion-button').contains('Iniciar Sesión').click()

    cy.then(() => {
      expect(mockDataService.obtenerUsuario).to.have.been.calledWith('juan@test.com', '1234')
    })

    cy.then(() => {
      expect(mockRouter.navigate).to.have.been.calledWith(['/home'])
    })
  })

  it('debe mostrar error cuando las credenciales son incorrectas', () => {
    const mockDataService = {
      init: cy.stub().resolves(),
      obtenerUsuario: cy.stub().resolves(null) 
    }

    const mockRouter = {
      navigate: cy.stub()
    }

    cy.mount(LoginFormComponent, {
      imports: [IonicModule.forRoot(), FormsModule, CommonModule],
      declarations: [LoginFormComponent],
      providers: [
        { provide: DataService, useValue: mockDataService },
        { provide: Router, useValue: mockRouter }
      ]
    })

    cy.get('#nombreUsuario').type('Usuario Incorrecto')
    cy.get('#correoUsuario').type('wrong@test.com')
    cy.get('#password').type('wrongpass')

    cy.get('ion-button').contains('Iniciar Sesión').click()

    cy.get('.error-message').should('contain.text', 'Usuario o contraseña incorrectos')

    cy.then(() => {
      expect(mockRouter.navigate).not.to.have.been.called
    })
  })

  it('debe limpiar errores cuando se llama clearErrs', () => {
    const mockDataService = {
      init: cy.stub().resolves(),
      obtenerUsuario: cy.stub().resolves(usuarioTestData)
    }

    const mockRouter = {
      navigate: cy.stub()
    }

    cy.mount(LoginFormComponent, {
      imports: [IonicModule.forRoot(), FormsModule, CommonModule],
      declarations: [LoginFormComponent],
      providers: [
        { provide: DataService, useValue: mockDataService },
        { provide: Router, useValue: mockRouter }
      ]
    })

    cy.get('ion-button').contains('Iniciar Sesión').click()
    cy.get('.error-message').should('exist')

    cy.get('#nombreUsuario').type('Juan')
    cy.get('#correoUsuario').type('juan@test.com')
    cy.get('#password').type('1234')
    cy.get('ion-button').contains('Iniciar Sesión').click()

    cy.get('.message-container').should('not.contain', '.error-message')
  })

  it('debe verificar que los campos tienen ngModel binding correcto', () => {
    const mockDataService = {
      init: cy.stub().resolves(),
      obtenerUsuario: cy.stub().resolves(usuarioTestData)
    }

    const mockRouter = {
      navigate: cy.stub()
    }

    cy.mount(LoginFormComponent, {
      imports: [IonicModule.forRoot(), FormsModule, CommonModule],
      declarations: [LoginFormComponent],
      providers: [
        { provide: DataService, useValue: mockDataService },
        { provide: Router, useValue: mockRouter }
      ]
    }).then((wrapper) => {
      const component = wrapper.component as LoginFormComponent

      expect(component.data).to.exist
      expect(component.data.username).to.equal('')
      expect(component.data.email).to.equal('')
      expect(component.data.password).to.equal('')
    })

    cy.get('#nombreUsuario').should('have.attr', 'placeholder')
    cy.get('#correoUsuario').should('have.attr', 'placeholder')
    cy.get('#password').should('have.attr', 'type', 'password')
  })

  it('debe validar estructura del formulario Ionic', () => {
    const mockDataService = {
      init: cy.stub().resolves(),
      obtenerUsuario: cy.stub().resolves(usuarioTestData)
    }

    const mockRouter = {
      navigate: cy.stub()
    }

    cy.mount(LoginFormComponent, {
      imports: [IonicModule.forRoot(), FormsModule, CommonModule],
      declarations: [LoginFormComponent],
      providers: [
        { provide: DataService, useValue: mockDataService },
        { provide: Router, useValue: mockRouter }
      ]
    })

    cy.get('.login-container').should('exist')
    cy.get('.login-form').should('exist')
    cy.get('.input-group').should('have.length', 3)

    cy.get('ion-input').should('have.length', 3)
    cy.get('ion-input').each(($input) => {
      cy.wrap($input).should('have.attr', 'label-placement', 'floating')
      cy.wrap($input).should('have.attr', 'fill', 'outline')
    })

    cy.get('ion-button').should('have.attr', 'expand', 'block')
  })
})
