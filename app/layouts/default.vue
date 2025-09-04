

<template>
  
  <div class="min-h-screen bg-slate-950 text-slate-200 font-sans">
    <!-- NAVBAR -->
    <header class="navbar">
      <div class="navbar__container">
        <NuxtLink to="/" class="navbar__brand">Contadores</NuxtLink>

        <!-- Botón hamburguesa blanco -->
        <button class="navbar__toggle text-white" @click="isOpen = true" aria-label="Abrir menú">
  <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
      d="M4 6h16M4 12h16M4 18h16" />
  </svg>
</button>
      </div>
    </header>

    <!-- SIDEBAR -->
    <div v-if="isOpen" class="sidebar__overlay" @click="isOpen = false" />
    <aside :class="['sidebar', { 'sidebar--open': isOpen }]">
      <button class="sidebar__close" @click="isOpen = false" aria-label="Cerrar menú">×</button>
      <nav class="sidebar__nav">
        <NuxtLink to="/" class="sidebar__link" exact-active-class="active">Inicio</NuxtLink>
        <NuxtLink to="/contadores" class="sidebar__link" exact-active-class="active">Contadores</NuxtLink>
      </nav>
    </aside>

    <!-- MAIN -->
    <main class="max-w-6xl mx-auto px-4 py-6">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isOpen = ref(false)
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

  &__toggle {
    background: transparent;
    border: none;
    cursor: pointer;
    display: block;
  }
}

/* SIDEBAR */
.sidebar {
  position: fixed;
  top: 0;
  right: -100%;
  width: 80%;
  max-width: 300px;
  height: 100%;
  background-color: #1e293b;
  padding: 2rem 1.5rem;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.3);
  transition: right 0.3s ease;
  z-index: 50;

  &--open {
    right: 0;
  }

  &__close {
    position: absolute;
    top: 0.5rem;
    right: 1rem;
    font-size: 2rem;
    background: none;
    border: none;
    color: #f1f5f9;
    cursor: pointer;
  }

  &__nav {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;
  }

  &__link {
    font-size: 1.2rem;
    font-weight: 500;
    color: #e2e8f0;
    text-decoration: none;

    &:hover {
      color: #38bdf8;
    }

    &.active {
      color: #f472b6;
      font-weight: 700;
    }
  }
}

.navbar__toggle {
  background: transparent;
  border: none;
  color: #ffffff; // Asegura que tenga color blanco por defecto también
  cursor: pointer;
  display: block;
}

/* Overlay cuando abre menú */
.sidebar__overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(15, 23, 42, 0.6);
  z-index: 40;
}
</style>
