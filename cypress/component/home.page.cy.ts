import { HomePage } from "../../src/app/home/home.page"
import { DataService } from "../../src/app/services/dataservice.service"
import { ApiserviceService } from "../../src/app/services/apiservice.service"
import { Router } from "@angular/router"
import { IonicModule } from "@ionic/angular"
import { CommonModule } from "@angular/common"
import { PeliculaComponent } from "../../src/app/components/pelicula/pelicula.component"
import { MatCardModule } from "@angular/material/card"
import { of } from "rxjs"

const stateTestData = {
  isLoggedIn: true,
  user: { id: 1, nombre: "Juan", apellido: "Pérez", email: "juan@test.com", pass: "1234" }
}

const mockPeliculas = [
  { id: 1, title: "Test Movie 1", poster: "poster1.jpg", director: "Director 1", year: "2021", genre: "Action" }
]

function createMockDataService() {
  return {
    init: cy.stub().resolves(),
    getState: cy.stub().returns(of(stateTestData)),
    obtenerPeliculasFavoritas: cy.stub().returns(of(mockPeliculas)),
    obtenerPeliculasPendientes: cy.stub().returns(of(mockPeliculas)),
    obtenerPeliculasCatalogo: cy.stub().returns(of(mockPeliculas))
  }
}

function createMockApiService() {
  return {
    obtenerClima: cy.stub().returns(of({ main: { temp: 25 }, name: "Santiago", weather: [{ description: "soleado" }] }))
  }
}

function createMockRouter() {
  return {
    navigate: cy.stub(),
    getCurrentNavigation: cy.stub().returns({ extras: { state: stateTestData } })
  }
}

describe("HomePage - Pruebas Unitarias", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem("loggedPass", "1234")
    })
  })

  it("debe renderizarse correctamente", () => {
    const mockDataService = createMockDataService()
    const mockApiService = createMockApiService()
    const mockRouter = createMockRouter()

    cy.mount(HomePage, {
      imports: [IonicModule.forRoot(), CommonModule, MatCardModule],
      declarations: [HomePage, PeliculaComponent],
      providers: [
        { provide: DataService, useValue: mockDataService },
        { provide: ApiserviceService, useValue: mockApiService },
        { provide: Router, useValue: mockRouter }
      ]
    })

    cy.get("ion-header.unified-header").should("exist")
    cy.get("ion-content.unified-content").should("exist")
    cy.get(".page-container").should("exist")
  })

  it("debe mostrar enlaces de navegación", () => {
    const mockDataService = createMockDataService()
    const mockApiService = createMockApiService()
    const mockRouter = createMockRouter()

    cy.mount(HomePage, {
      imports: [IonicModule.forRoot(), CommonModule, MatCardModule],
      declarations: [HomePage, PeliculaComponent],
      providers: [
        { provide: DataService, useValue: mockDataService },
        { provide: ApiserviceService, useValue: mockApiService },
        { provide: Router, useValue: mockRouter }
      ]
    })

    cy.get("ion-button").contains("Directores").should("exist")
    cy.get("ion-button").contains("Comentarios").should("exist")
  })
})
