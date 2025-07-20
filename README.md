# 🎬 MovieIonic

## 📱 ¿Qué es esta aplicación?

**MovieIonic** es una aplicación móvil híbrida desarrollada con **Ionic 8** y **Angular 19** que permite a los usuarios explorar un catálogo personalizado de películas, directores y comentarios. Es un proyecto educativo completo que implementa conceptos avanzados de desarrollo móvil, arquitectura de componentes, gestión de estado, y persistencia de datos local.

## ✨ Principales funcionalidades

### 🔐 Autenticación y Registro
- **Sistema de login** con validación de credenciales
- **Registro de usuarios** con selección personalizada de películas
- **Guardado automático** de sesión en localStorage
- **Protección de rutas** mediante guards de autenticación

### 🎭 Gestión de Películas
- **Catálogo personalizado** por usuario
- **Detalle completo** de cada película (título, año, género, director, descripción)
- **Navegación fluida** entre el listado y detalle
- **Componente reutilizable** para tarjetas de películas con animaciones

### 👥 Directores
- **Listado de directores** con información detallada
- **Filtrado de películas** por director
- **Navegación integrada** desde películas a directores

### 💬 Sistema de Comentarios
- **Visualización de comentarios** de usuarios
- **Paginación inteligente** para mejorar rendimiento
- **Integración con API externa** para contenido adicional

### 🌤️ Funciones Adicionales
- **Geolocalización automática** con permisos de ubicación
- **Información meteorológica** basada en ubicación actual
- **Diseño responsive** optimizado para dispositivos móviles
- **Animaciones fluidas** con Ionic Animations API

## 🏗️ Arquitectura y Tecnologías

### Core Framework
- **Ionic 8.0.0** - Framework UI híbrido
- **Angular 19.0.0** - Framework frontend
- **Capacitor 7.4.0** - Runtime nativo para funcionalidades del dispositivo

### UI/UX Components
- **Angular Material 19.2.18** - Componentes de diseño Material
- **Ionic Components** - Elementos UI nativos optimizados
- **CSS Grid & Flexbox** - Layout responsivo moderno
- **Gradientes personalizados** - Diseño visual cohesivo

### Data Management
- **SQLite local** - Base de datos local embebida
- **Ionic Storage** - Persistencia de configuración
- **RxJS** - Manejo reactivo de datos
- **Modelos TypeScript** - Tipado fuerte de datos

### Native Features
- **Geolocation API** - Ubicación del dispositivo
- **Camera Plugin** - Acceso a cámara (preparado)
- **Storage Plugin** - Almacenamiento nativo
- **Haptics** - Feedback táctil

### Testing & Quality
- **Cypress 14.5.1** - Testing E2E y de componentes
- **Jasmine & Karma** - Unit testing
- **ESLint** - Análisis estático de código
- **TypeScript 5.6.3** - Tipado estático

## 📂 Estructura del Proyecto

```
src/
├── app/
│   ├── components/          # Componentes reutilizables
│   │   ├── login-form/     # Formulario de login
│   │   └── pelicula/       # Tarjeta de película
│   ├── pages/              # Páginas de la aplicación
│   │   ├── home/          # Página principal
│   │   ├── login/         # Autenticación
│   │   ├── agregar/       # Registro de usuarios
│   │   ├── peliculas/     # Detalle de películas
│   │   ├── directores/    # Listado de directores
│   │   ├── comentarios/   # Sistema de comentarios
│   │   └── notfound/      # Página 404
│   ├── services/          # Servicios de la aplicación
│   │   ├── dataservice.service.ts    # Gestión de datos principal
│   │   ├── apiservice.service.ts     # Consumo de APIs externas
│   │   ├── DB/            # Modelos y gestión de base de datos
│   │   └── Storage/       # Servicios de almacenamiento
│   ├── guards/            # Protección de rutas
│   ├── assets/            # Recursos estáticos
│   └── theme/            # Estilos globales
├── android/              # Proyecto Android nativo
├── ios/                  # Proyecto iOS nativo
└── cypress/              # Tests automatizados
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- **Node.js** 18+ 
- **npm** o **yarn**
- **Ionic CLI** `npm install -g @ionic/cli`
- **Android Studio** (para build Android)
- **Xcode** (para build iOS - solo macOS)

### Instalación
```bash
# Clonar el repositorio
git clone [url-del-repositorio]
cd movieIonic

# Instalar dependencias
npm install

# Inicializar base de datos
ionic serve
```

### Comandos Disponibles
```bash
# Desarrollo
npm start                 # Servidor de desarrollo
ionic serve              # Servidor con live reload

# Testing
npm test                 # Unit tests con Karma
npx cypress open         # Tests E2E con Cypress

# Build
npm run build            # Build para producción
ionic capacitor build android    # Build Android
ionic capacitor build ios        # Build iOS

# Calidad de código
npm run lint             # Análisis de código con ESLint
```

## 📱 Funcionalidades Nativas

### Geolocalización
- Solicitud automática de permisos
- Obtención de coordenadas precisas
- Integración con API meteorológica

### Almacenamiento Local
- SQLite para datos estructurados
- Ionic Storage para configuración
- Persistencia de sesión de usuario

### Capacitor Plugins
- `@capacitor/geolocation` - Ubicación GPS
- `@capacitor/storage` - Almacenamiento nativo
- `@capacitor/camera` - Acceso a cámara
- `@capacitor/haptics` - Feedback táctil

## 🧪 Testing

### Unit Tests
- **Jasmine** para especificaciones
- **Karma** como test runner
- Cobertura de servicios y componentes críticos

### E2E Tests
- **Cypress** para tests de integración
- Simulación de flujos de usuario completos
- Tests de componentes individuales

### Ejecutar Tests
```bash
# Unit tests
npm test

# E2E tests
npx cypress open
```

## 🎨 Diseño y UX

### Sistema de Diseño
- **Paleta de colores** púrpura/violeta consistente
- **Tipografía** optimizada para legibilidad móvil
- **Iconografía** Ionicons + Material Icons
- **Animaciones** fluidas con CSS3 y Ionic Animations

### Responsive Design
- **Mobile-first** approach
- **Breakpoints** optimizados para tablets
- **Touch-friendly** interfaces
- **Accesibilidad** básica implementada

## 🔧 Configuración Avanzada

### Variables de Entorno
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'https://api.ejemplo.com',
  weatherApiKey: 'tu-api-key'
};
```

### Capacitor Configuration
```typescript
// capacitor.config.ts
const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'movieIonic',
  webDir: 'www',
  plugins: {
    Geolocation: {
      permissions: ['location']
    }
  }
};
```

## 🎯 Próximas Mejoras

- [ ] Implementación de favoritos
- [ ] Sistema de calificaciones
- [ ] Notificaciones push
- [ ] Sincronización en la nube
- [ ] Modo offline mejorado
- [ ] Compartir películas en redes sociales

## 👨‍💻 Desarrollo y Contribución

### Para Estudiantes
Este proyecto es ideal para aprender:
- **Arquitectura de aplicaciones móviles**
- **Integración de APIs externas**
- **Manejo de estado en Angular**
- **Testing automatizado**
- **Deployment de apps híbridas**

### Tecnologías Aplicadas
- **Patrón de diseño**: Service Layer + Component Architecture
- **Gestión de estado**: RxJS Observables
- **Navegación**: Angular Router con lazy loading
- **Persistencia**: SQLite + Ionic Storage
- **Testing**: TDD con Cypress y Jasmine

## 📄 Licencia

Proyecto educativo - DUOC UC - Programación de Aplicaciones Móviles

---