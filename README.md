# Star Wars Frontend

Frontend responsivo con Next.js y Tailwind para visualizar datos del universo Star Wars. Conecta a la API backend para mostrar personajes, películas, naves y planetas. Permite agregar favoritos y comparar ítems visualmente.

## Características Principales

- 🚀 **Next.js App Router**: Navegación optimizada y basada en archivos.
- 🎨 **Diseño Star Wars**: Estilo visual temático con efectos y animaciones.
- ⭐ **Sistema de Favoritos**: Agrega y visualiza ítems marcados como favoritos.
- ⚖️ **Comparación Visual**: Compara personajes, naves, planetas o películas.
- 🧑‍🚀 **Autenticación con Google**: Inicia sesión para guardar tus favoritos.
- 📱 **Responsive**: Interfaz adaptada a dispositivos móviles y escritorio.

## Tecnologías

- **Frontend**: Next.js 15 (App Router)
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion
- **Autenticación**: NextAuth (Google Provider)
- **Consumo API**: Fetch desde el backend NestJS

## Instalación

1. **Clonar repositorio**:

   ```bash
   git clone https://github.com/tu-usuario/star-wars-frontend.git
   ```

2. **Instalar dependencias**:

   ```bash
   npm install
   ```

3. **Configurar entorno (.env.local)**:

   ```bash
   cp .env.example .env.local
   ```

## Variables de Entorno

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3020
NEXTAUTH_SECRET=tu_secreto
GOOGLE_CLIENT_ID=xxxxxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxxxxxxx
```

## Scripts

```bash
# Desarrollo
npm run dev

# Producción
npm run build
npm run start

# Lint
npm run lint
```

## Estructura del Proyecto

```
src/
├── app/                   # Rutas App Router (favoritos, comparación, recursos)
│   └── [category]/[id]/   # Vista detalle por tipo e ID
├── components/            # UI modularizada (Header, Grid, Detail, etc.)
├── lib/                   # Animaciones y configuración
├── types/                 # Tipos TypeScript
├── utils/                 # Formateo, helpers de recursos, parseadores
└── styles/                # Estilos globales
```

## Funcionalidades

- 🧭 Navegación por categoría: `/people`, `/films`, `/starships`, `/planets`
- 🔍 Vista detallada de cada recurso
- ✅ Botón de favoritos por ítem
- 🧠 Detección de login para guardar favoritos
- 🧮 Comparador visual en `/compare/[category]`

## Favoritos

Al iniciar sesión con Google, puedes marcar recursos como favoritos. Estos se guardan en el backend y se visualizan en la ruta:

```
/favorites
```

## Comparador

Selecciona recursos para comparar y accede a:

```
/compare/[category]?ids=1,2,3
```

Visualiza los atributos comparados en una grilla de 3 columnas por fila.

---

🖖 Que la fuerza te acompañe.
