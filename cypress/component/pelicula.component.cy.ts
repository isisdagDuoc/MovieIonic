import { PeliculaComponent } from '../../src/app/components/pelicula/pelicula.component'
import { PeliculaCatalogo } from '../../src/app/services/DB/models/pelicula-catalogo'
import { DataService } from '../../src/app/services/dataservice.service'
import { Router } from '@angular/router'
import { MatCardModule } from '@angular/material/card'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CommonModule } from '@angular/common'
import { IonicModule, AnimationController } from '@ionic/angular'

describe('PeliculaComponent - Pruebas Básicas', () => {
  const peliculaPrueba: PeliculaCatalogo = {
    id: 1,
    title: 'Avatar',
    year: 2009,
    rating: 8.5,
    genre: 'Ciencia Ficción',
    image: 'avatar.jpg',
    directorId: 1,
    description: 'Una historia épica de ciencia ficción ambientada en Pandora.'
  }

  it('debe renderizarse sin errores', () => {
    const mockDataService = {
      init: cy.stub().resolves(),
      obtenerPeliculasCatalogo: cy.stub().resolves([peliculaPrueba])
    }

    const mockRouter = {
      navigate: cy.stub()
    }

    const mockAnimationController = {
      create: cy.stub().returns({
        addElement: cy.stub().returns({
          fill: cy.stub().returns({
            duration: cy.stub().returns({
              keyframes: cy.stub().returns({
                play: cy.stub().resolves()
              })
            })
          })
        })
      })
    }

    cy.mount(PeliculaComponent, {
      imports: [MatCardModule, BrowserAnimationsModule, CommonModule, IonicModule.forRoot()],
      declarations: [PeliculaComponent],
      providers: [
        { provide: DataService, useValue: mockDataService },
        { provide: Router, useValue: mockRouter },
        { provide: AnimationController, useValue: mockAnimationController }
      ]
    })

    cy.get('mat-card').should('exist')
  })

  it('debe mostrar información de película cuando se pasa como input', () => {
    const mockDataService = {
      init: cy.stub().resolves(),
      obtenerPeliculasCatalogo: cy.stub().resolves([peliculaPrueba])
    }

    const mockRouter = {
      navigate: cy.stub()
    }

    const mockAnimationController = {
      create: cy.stub().returns({
        addElement: cy.stub().returns({
          fill: cy.stub().returns({
            duration: cy.stub().returns({
              keyframes: cy.stub().returns({
                play: cy.stub().resolves()
              })
            })
          })
        })
      })
    }

    cy.mount(PeliculaComponent, {
      imports: [MatCardModule, BrowserAnimationsModule, CommonModule, IonicModule.forRoot()],
      declarations: [PeliculaComponent],
      providers: [
        { provide: DataService, useValue: mockDataService },
        { provide: Router, useValue: mockRouter },
        { provide: AnimationController, useValue: mockAnimationController }
      ],
      componentProperties: {
        pelicula: peliculaPrueba
      }
    })

    cy.get('mat-card-title').should('contain.text', 'Avatar')
    cy.get('mat-card-content').should('contain.text', '2009')
    cy.get('img.movie-img').should('exist')
    cy.get('ion-button').contains('Ver más').should('exist')
  })

  it('debe manejar clic en "ver más"', () => {
    const mockDataService = {
      init: cy.stub().resolves(),
      obtenerPeliculasCatalogo: cy.stub().resolves([peliculaPrueba])
    }

    const mockRouter = {
      navigate: cy.stub()
    }

    const mockAnimationController = {
      create: cy.stub().returns({
        addElement: cy.stub().returns({
          fill: cy.stub().returns({
            duration: cy.stub().returns({
              keyframes: cy.stub().returns({
                play: cy.stub().resolves()
              })
            })
          })
        })
      })
    }

    cy.mount(PeliculaComponent, {
      imports: [MatCardModule, BrowserAnimationsModule, CommonModule, IonicModule.forRoot()],
      declarations: [PeliculaComponent],
      providers: [
        { provide: DataService, useValue: mockDataService },
        { provide: Router, useValue: mockRouter },
        { provide: AnimationController, useValue: mockAnimationController }
      ],
      componentProperties: {
        pelicula: peliculaPrueba
      }
    })

    cy.get('ion-button').contains('Ver más').click()

    // Wait for the async navigation to complete
    cy.wait(1100).then(() => {
      expect(mockRouter.navigate).to.have.been.called
    })
  })
})
