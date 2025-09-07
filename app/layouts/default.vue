<template>
  <div class="min-h-screen bg-slate-950 text-slate-200 font-sans flex flex-col">
    <!-- NAVBAR -->
    <header class="navbar">
      <div class="navbar__container">
        <!-- Marca -->
        <NuxtLink to="/" class="navbar__brand">Contadores</NuxtLink>

        <!-- Links -->
        <nav class="navbar__links">
          <NuxtLink to="/" class="navbar__link" exact-active-class="active">Inicio</NuxtLink>
          <NuxtLink to="/contadores" class="navbar__link" exact-active-class="active">Contadores</NuxtLink>
        </nav>
      </div>
    </header>

    <!-- MAIN -->
    <main class="max-w-6xl mx-auto px-4 py-6 flex-1">
      <slot />
    </main>

    <!-- FOOTER -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Footer from '../../components/Footer.vue'
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap');

/* NAVBAR */
.navbar {
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba(13, 71, 209, 0.85);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__brand {
    font-size: 1.5rem;
    font-weight: 700;
    color: #f9fafb;
    text-decoration: none;

    &:hover {
      color: #a78bfa;
    }
  }

  &__links {
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }

  &__link {
    font-size: 1.1rem;
    font-weight: 500;
    color: #e2e8f0;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: #38bdf8;
    }

    &.active {
      color: #f472b6;
      font-weight: 700;
    }
  }
}
</style>
