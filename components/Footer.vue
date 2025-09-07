<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Branding -->
      <span class="footer-brand">🧮 Contadores App</span>

      <!-- Links opcionales -->
      <nav class="footer-links">
        <a href="https://github.com/nachodiazcode" target="_blank" rel="noopener">GitHub</a>
        <a href="https://www.linkedin.com/in/nachodiazcode" target="_blank" rel="noopener">LinkedIn</a>
        <a href="mailto:contacto@contadores.app">Contacto</a>
      </nav>

      <!-- Copy -->
      <small class="footer-copy">
        © {{ new Date().getFullYear() }} · Todos los derechos reservados
      </small>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: linear-gradient(to right, #0f172a, #1e293b); /* azul marino elegante */
  color: #e2e8f0;
  padding: 1.5rem 1rem;
  margin-top: 0rem;
}

.footer-container {
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .75rem;
  text-align: center;
}

.footer-brand {
  font-weight: 700;
  font-size: 1.1rem;
  color: #f472b6; /* rosado pro */
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}

.footer-links a {
  color: #93c5fd; /* azul claro */
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.footer-links a:hover {
  color: #38bdf8; /* cian */
}

.footer-copy {
  font-size: 0.85rem;
  color: #cbd5e1;
}
</style>
