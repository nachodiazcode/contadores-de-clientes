<template>
  <div class="min-h-screen bg-slate-950 text-slate-200 font-sans">
    <!-- NAV 9.0 Premium Responsive -->
    <header class="navbar">
      <div class="navbar__container">
        <NuxtLink to="/" class="navbar__brand">Contadores</NuxtLink>
        <button class="navbar__toggle" @click="toggleMenu">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5M3.75 12h16.5M3.75 18.75h16.5" />
          </svg>
        </button>
        <nav :class="['navbar__links', { 'navbar__links--open': isOpen }]">
          <NuxtLink to="/" class="navbar__link" exact-active-class="active">Inicio</NuxtLink>
          <NuxtLink to="/contadores" class="navbar__link" exact-active-class="active">Contadores</NuxtLink>
        </nav>
      </div>
    </header>

    <!-- SLOT -->
    <main class="max-w-6xl mx-auto px-4 py-6">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isOpen = ref(false)
const toggleMenu = () => (isOpen.value = !isOpen.value)
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap');

.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

  &__brand {
    font-size: 1.5rem;
    font-weight: 700;
    color: #f9fafb;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #a78bfa;
    }
  }

  &__toggle {
    display: none;
    background: transparent;
    border: none;
    color: #f1f5f9;
    cursor: pointer;
    @media (max-width: 768px) {
      display: block;
    }
  }

  &__links {
    display: flex;
    gap: 1.25rem;
    align-items: center;

    @media (max-width: 768px) {
      display: none;
      flex-direction: column;
      width: 100%;
      padding-top: 0.75rem;

      &--open {
        display: flex;
      }
    }
  }

  &__link {
    font-weight: 500;
    font-size: 1rem;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    color: #e2e8f0;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.05);
      color: #38bdf8;
    }

    &.active {
      color: #f472b6;
      background: rgba(255, 255, 255, 0.07);
      font-weight: 600;
    }
  }
}
</style>