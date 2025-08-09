# 🌠 Star Wars Frontend 🚀🪐

Frontend galáctico y responsivo construido con **Next.js** y **Tailwind CSS** para explorar datos del **universo Star Wars**.  
Conecta a la API backend para mostrar personajes, películas, naves y planetas.  
Permite **agregar favoritos** ⭐ y **comparar ítems** visualmente ⚖️.

🌍 **Demo**: https://thestarwars.site/

---

## ✨ Características Principales

- 🚀 **Next.js App Router** → Navegación ultrarrápida y optimizada.
- 🎨 **Diseño temático Star Wars** → Estilo cinematográfico con efectos y animaciones interactivas.
- ⭐ **Sistema de Favoritos** → Guarda tus héroes, naves y planetas preferidos.
- ⚖️ **Comparación Visual** → Compara personajes, naves, planetas o películas lado a lado.
- 🧑‍🚀 **Autenticación con Google** → Inicia sesión para guardar tus favoritos en la nube.
- 📱 **Responsive Total** → Interfaz que se adapta a móviles, tablets y escritorio.

---

## 🛠 Tecnologías

| Tecnología   | Uso |
|--------------|-----|
| **Next.js 15 (App Router)** | Framework principal del frontend |
| **Tailwind CSS** | Estilos rápidos y responsivos |
| **Framer Motion** | Animaciones fluidas y dinámicas |
| **NextAuth** | Autenticación con Google |
| **Fetch API** | Consumo del backend NestJS |

---

## ⚙️ Instalación

1. **Clonar repositorio**  
   ```bash
   git clone https://github.com/tu-usuario/star-wars-frontend.git
   ```

2. **Instalar dependencias**  
   ```bash
   npm install
   ```

3. **Configurar entorno (.env.local)**  
   ```bash
   cp .env.example .env.local
   ```

---

## 🔑 Variables de Entorno

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3020
NEXTAUTH_SECRET=tu_secreto
GOOGLE_CLIENT_ID=xxxxxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxxxxxxx
```

---

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Producción
npm run build
npm run start

# Lint
npm run lint
```

---

## 🗂 Estructura del Proyecto

```
src/
├── app/                   # Rutas App Router (favoritos, comparación, recursos)
│   └── [category]/[id]/   # Vista detalle por tipo e ID
├── components/            # UI modularizada (Header, Grid, Detail, etc.)
├── lib/                   # Animaciones y configuración
├── types/                 # Tipos TypeScript
├── utils/                 # Formateo, helpers, parsers
└── styles/                # Estilos globales
```

---

## 🌌 Funcionalidades

- 🧭 Navegación por categoría: `/people`, `/films`, `/starships`, `/planets`
- 🔍 Vista detallada con información expandida
- ⭐ Botón de favoritos en cada ítem
- 🧠 Detección de login para persistir favoritos
- ⚖️ Comparador visual en `/compare/[category]`

---

## ⭐ Favoritos

Al iniciar sesión con Google, podrás marcar recursos como favoritos.  
Estos se guardarán en el backend y podrás verlos en:

```
/favorites
```

---

## ⚖️ Comparador

Selecciona los recursos que quieras comparar y accede a:

```
/compare/[category]?ids=1,2,3
```

Visualiza los atributos comparados en una grilla de **tres columnas** para un análisis rápido.

---

> 🖖 Que la fuerza te acompañe y el código esté contigo.