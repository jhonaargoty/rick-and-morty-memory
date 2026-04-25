# Rick & Morty Memory Game

Un juego de memoria construido con React + TypeScript, respaldado por un BFF (Backend for Frontend) en Express que gestiona la autenticación mediante JWT.

---

## 🧠 Enfoque de desarrollo

El proyecto está estructurado como un **monorepo** con dos packages independientes:

- `packages/client` — Aplicación React + TypeScript construida con Vite
- `packages/bff` — Servidor Express + TypeScript que actúa como BFF

La decisión de incluir un BFF en una prueba técnica de frontend fue intencional: permite gestionar la autenticación y emisión de JWT en el servidor, replicando un flujo real de autenticación en lugar de simularlo completamente en el cliente.

---

## ⚙️ Decisiones técnicas

### Monorepo con npm workspaces
Se utilizó npm workspaces para gestionar ambos packages desde la raíz, permitiendo levantar todo el proyecto con un solo comando (`npm run dev`) usando `concurrently`.

### BFF para autenticación
El BFF expone un único endpoint de autenticación (`POST /api/auth/login`) que valida credenciales y emite un JWT firmado con `jsonwebtoken`. El cliente almacena el token en `localStorage` y lo incluye en cada request como `Bearer token`.

El cliente consume la API pública de Rick and Morty directamente, ya que agregar un proxy en el BFF no aportaría valor de seguridad en este contexto.

### useReducer + Context
El estado de autenticación y el estado del juego se gestionan con el patrón `useReducer + Context`, evitando prop drilling y manteniendo la lógica de transiciones de estado centralizada y predecible. Este patrón refleja cómo funciona Redux internamente, sin agregar dependencias externas.

### Estructura por features
El cliente sigue una arquitectura orientada a features en lugar de tipo de archivo:

src/
├── features/
│   ├── auth/
│   └── game/
├── context/
├── services/
└── router/

Esto garantiza que el código que cambia junto vive junto, facilitando el mantenimiento y escalabilidad.

### Animación 3D de cartas
El flip de las cartas se implementó con CSS puro usando `transform-style: preserve-3d` y `rotateY`, sin ninguna librería de animación. Esto demuestra que es posible lograr efectos visuales premium sin dependencias adicionales.

### Protected Routes
Las rutas protegidas se implementaron con un componente `ProtectedRoute` que verifica el estado de autenticación antes de renderizar. Si el usuario no está autenticado, redirige automáticamente al login.

### Fisher-Yates Shuffle
Las cartas se barajan usando el algoritmo Fisher-Yates, garantizando una distribución uniforme y aleatoria en cada partida.

---

## 🚀 Instrucciones para correr el proyecto

### Requisitos
- Node.js >= 18
- npm >= 9

### Instalación

```bash
git clone https://github.com/jhonaargoty/rick-and-morty-memory.git
cd rick-and-morty-memory
npm install
```

### Variables de entorno

Crea el archivo `packages/bff/.env`:

PORT=3000
JWT_SECRET=rick-and-morty-super-secret-key

### Levantar el proyecto

```bash
npm run dev
```

Esto levanta simultáneamente:
- BFF en `http://localhost:3000`
- Cliente en `http://localhost:5173`

### Credenciales de acceso

| Usuario | Contraseña |
|---------|------------|
| rick | pickle123 |
| morty | adventures123 |

---

## 🛠️ Stack tecnológico

| Capa | Tecnología |
|------|------------|
| Frontend | React 18 + TypeScript |
| Build tool | Vite |
| Routing | React Router v6 |
| Estilos | CSS Modules |
| BFF | Express + TypeScript |
| Auth | JWT (jsonwebtoken) |
| Monorepo | npm workspaces + concurrently |