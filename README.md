# Contadores de Clientes · Nuxt 4 + Vuex

Aplicación Nuxt 4 para administrar contadores de clientes (crear, filtrar, ordenar, sumar y persistir estado).
Rediseñada para utilizar **Vuex** como sistema de manejo de estado, manteniendo compatibilidad con SSR y desarrollo profesional.

---

## 🧰 Stack Tecnológico

| Herramienta    | Uso Principal |
|----------------|----------------|
| Nuxt 4         | SSR, routing por archivos, auto-importes |
| Vue 3          | Framework principal |
| TypeScript 5   | Tipado moderno |
| Vuex 4         | Manejo de estado |
| Nuxt UI 3      | Componentes de UI modernos (opcional) |
| ESLint 9       | Linting y estilo de código |
| Tailwind CSS   | Estilado responsive (opcional) |

---

## 📂 Estructura del Proyecto (resumen)

```
app/
├─ app.vue
├─ layouts/default.vue
└─ pages/
   ├─ clientes.vue
   ├─ contadores.vue
   └─ index.vue
assets/
└─ css/tailwind.css
components/
├─ Contador.vue
├─ FiltrarContadores.vue
├─ Footer.vue
├─ Header.vue
├─ ListadorDeContadores.vue
├─ ModalAgregarContador.vue
├─ OrdenarContadores.vue
└─ SumaDeContadores.vue
store/
└─ index.js         # Vuex store principal
```

---

## 🎯 Funcionalidades implementadas

| Funcionalidad             | Descripción |
|---------------------------|-------------|
| ➕ Agregar contador        | Formulario con validación. Se guarda en Vuex y persiste en `localStorage`. |
| 🔍 Buscar contador         | Filtro en tiempo real que compara por nombre (case insensitive). |
| 🔼 Ordenar contadores      | Se ordenan alfabéticamente o por cantidad (ascendente/descendente). |
| ➕➖ Incrementar / Decrementar | Cada contador tiene botones para modificar el valor. |
| 🗑️ Eliminar contador        | Botón con ícono de basurero que elimina de Vuex y del almacenamiento. |
| 💾 Persistencia local      | Vuex sincronizado con `localStorage` usando `onMounted` y `watch`. |
| 🌐 Transición de páginas   | Animación suave al cambiar entre rutas Nuxt. |

---

## 🔌 Requisitos

- Node.js ≥ 18.20 (recomendado 18.20.x o 20.x LTS)
- npm 10+
- Navegador moderno

---

## 🚀 Scripts de desarrollo

```bash
# Instalar dependencias
npm install

# Levantar en desarrollo (http://localhost:3000)
npm run dev

# Compilar para producción
npm run build

# Previsualizar versión compilada
npm run preview

# Ejecutar compilado (PM2/Docker/Node)
npm run start

# Lint + Typecheck
npm run lint
npm run typecheck
```

---

## 🧠 Manejo de estado con Vuex

- Se usa un `store/index.js` global con un módulo `contadores`.
- Las mutaciones controlan la creación, actualización y eliminación.
- Los **getters** calculan los contadores filtrados y sumados.
- Se sincroniza con `localStorage` para mantener el estado al recargar.
- Lectura y escritura protegidas por `process.client`.

---

## 🌈 Estilos (opcional con Tailwind)

```bash
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```js
// tailwind.config.js
export default {
  content: ['./app/**/*.{vue,js,ts}', './components/**/*.{vue,js,ts}'],
  theme: { extend: {} },
  plugins: []
}
```

---

## 🧪 CI/CD y Calidad

Ejemplo de verificación en GitHub Actions:

```yml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 18 }
      - run: npm ci
      - run: npm run lint
      - run: npm run build
```

---

## 🧭 Convenciones y Buenas prácticas

- Componentes en `PascalCase.vue`
- Accesibilidad con etiquetas semánticas (`header`, `main`, `footer`)
- Animaciones y transiciones suaves entre páginas
- Commits tipo Conventional Commits: `feat:`, `fix:`, `chore:`, etc.

---

## 📄 Licencia

MIT © 2025 — Ignacio Díaz

---

## 🆘 Soporte

Para sugerencias o dudas:
- Abre un issue
- Crea un pull request
- Contacta vía mensaje con contexto y pasos para reproducir

---