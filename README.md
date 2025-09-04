# Contadores de Clientes · Nuxt 4

> Aplicación Nuxt para administrar contadores (crear, filtrar, ordenar, sumar y persistir estado).  
> Código moderno con TypeScript, Pinia y Nuxt UI. Lista para desarrollo local, CI y despliegue SSR (Vercel/Node/Docker).

---

## 🧰 Stack

- **Nuxt 4** (SSR + auto‑importes, routing por archivos)
- **Vue 3 / Vite** (ESM, HMR)
- **TypeScript 5**
- **Pinia 3** para _state management_
- **Nuxt UI 3** (opcional para componentes de UI)
- **ESLint 9** (reglas integradas de `@nuxt/eslint`)

> Nota: Nuxt fija las versiones compatibles de `vue` y `vue-router`. No es necesario agregarlas como dependencias directas.

---

## 📦 Estructura de carpetas (resumen)

```
app/
├─ app.vue
├─ layouts/default.vue
└─ pages/
   ├─ clientes.vue
   ├─ contadores.vue
   └─ index.vue
assets/
└─ css/tailwind.css        # (opcional si usas Tailwind)
components/
├─ Contador.vue
├─ FiltrarContadores.vue
├─ Footer.vue
├─ Header.vue
├─ ListadorDeContadores.vue
├─ ModalAgregarContador.vue
├─ OrdenarContadores.vue
└─ SumaDeContadores.vue
stores/
└─ contadores.ts            # Store principal (Pinia)
.nuxt/                      # Generado por Nuxt (ignorar en git)
```

---

## ⏱ Requisitos

- **Node.js ≥ 18.20** (recomendado 18.20.x o 20.x LTS)
- **npm 10** (o el _package manager_ de tu preferencia)

```bash
node -v
npm -v
```

---

## 🚀 Comandos de desarrollo

```bash
# instalación
npm install

# desarrollo (localhost:3000)
npm run dev

# compilar para producción (Nitro SSR)
npm run build

# previsualizar compilado localmente
npm run preview

# ejecutar compilado en un server Node (PM2/Docker/VPS)
npm run start

# calidad de código
npm run lint
npm run lint:fix
npm run typecheck
```

> `postinstall` ejecuta `nuxt prepare` para generar _types_ y auto‑importes. Si cambias aliases o módulos, vuelve a correrlo.

---

## 🔌 Variables de entorno (opcional)

Crea un archivo `.env` (no se comitea) si necesitas configuración por ambiente.

```bash
# .env de ejemplo
NUXT_PUBLIC_BASE_URL=https://localhost:3000
NUXT_APP_ENV=local
```

En Nuxt:
- `NUXT_PUBLIC_*` → accesibles en cliente y servidor.
- otras variables → solo en servidor.

---

## 🗂️ Ruteo, Layouts y Auto‑importes

- **Páginas**: todo archivo en `app/pages` genera una ruta automáticamente (`contadores.vue` → `/contadores`).
- **Layouts**: `app/layouts/default.vue` envuelve todas las páginas por defecto.
- **Componentes**: se auto‑importan desde `components/*` (puedes usarlos sin `import`).
- **Stores**: con Pinia, usa el patrón `useXxx()` (p. ej. `useContadores()`). Al estar en `stores/`, Nuxt los registra y tipea automáticamente.

---

## 🧠 Estado con Pinia (guía rápida)

Principios que seguimos en `stores/contadores.ts`:
- **Estado mínimo** y derivado con **`computed`** (por ejemplo, `filtrados`, `totalVisitas`).
- Acciones puras y **sin efectos** secundarios no deterministas durante SSR.
- **Persistencia** en `localStorage/sessionStorage` **solo en cliente**.

> Si necesitas leer/escribir `localStorage/sessionStorage`, hazlo dentro de `onMounted()` o con guardas `if (process.client) { ... }` para evitar _hydration mismatches_.

---

## 🎨 Estilos

El proyecto incluye `assets/css/tailwind.css` por conveniencia. Si decides usar Tailwind de forma completa:

```bash
# instalar
npm i -D tailwindcss postcss autoprefixer

# inicializar
npx tailwindcss init -p
```

Luego añade al `tailwind.config.{js,ts}` las rutas Nuxt:

```js
export default {
  content: [
    './app/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}'
  ],
  theme: { extend: {} },
  plugins: []
}
```

> Si prefieres, puedes trabajar solo con Nuxt UI o CSS nativo.

---

## 🧪 Calidad y CI

Ejecuta verificación local o en CI:

```bash
npm run typecheck
npm run lint
```

Ejemplo de **GitHub Actions** (`.github/workflows/ci.yml`):

```yaml
name: CI
on:
  push: { branches: [main, master] }
  pull_request:
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 18 }
      - run: npm ci
      - run: npm run typecheck
      - run: npm run lint
      - run: npm run build
```

---

## ☁️ Despliegue

### Vercel (recomendado)
1. Importa el repo en Vercel.
2. _Framework Preset_: **Nuxt**.
3. Build Command: `npm run build` (por defecto).
4. Output: detectado automáticamente por Vercel (Nitro).

### Node/PM2 (VPS, bare metal)
```bash
npm run build
npm run start   # ejecuta .output/server/index.mjs
```

### Docker (SSR)
```dockerfile
# Dockerfile (ejemplo)
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS run
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/.output ./.output
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
```

### Netlify
- Command: `npm run build`
- Publish: `.output/public` (para SSG) o **adaptador SSR** (usando `netlify-cli`/adapters de Nitro si necesitas SSR).

---

## 🛠️ Resolución de problemas (FAQ)

**Hydration mismatch (estilos o texto):**
- Evita usar `Date.now()`, `Math.random()`, lecturas de `localStorage` o datos no deterministas **en render SSR**.
- Si una UI depende del navegador (medidas, `window`, `document`), usa `<ClientOnly>` o `if (process.client)`.

**“No match found for location with path …”**
- Verifica la ruta existente en `app/pages` y que el `navigateTo('/ruta')` o `<NuxtLink to="/ruta" />` apunten a un archivo real.

**“Cannot find module …/stores/xxx”**
- Prefiere los alias de Nuxt `~/` o `@/` (ya configurados). Ejemplo: `import { useContadores } from '~/stores/contadores'`.

**ESLint no detecta reglas/auto‑importes**
- Ejecuta `npm run postinstall` o `nuxt prepare`. Reinicia el IDE después de instalar dependencias.

---

## 🧭 Convenciones

- **Nombres**: componentes `PascalCase.vue`, stores `useXxx.ts`.
- **Imports**: usa alias `~/` y el auto‑import de Nuxt siempre que sea posible.
- **Accesibilidad**: etiquetas semánticas (`header`, `main`, `footer`), `aria-*` en elementos interactivos.
- **Commits**: se recomienda **Conventional Commits** (`feat:`, `fix:`, `chore:` …).

---

## 📄 Licencia

MIT © 2025 — Autor: Tu Nombre

---

## 📬 Soporte / Mantenimiento

- Issues y mejoras vía Pull Request.
- Para dudas rápidas, documenta el contexto, pasos para reproducir y _logs_ relevantes.
