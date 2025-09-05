<template>
  <main class="hero">
    <div class="hero__inner">
      <!-- 👇 Aquí va el br que evita el solapamiento -->
      <h1 class="hero__title">
        Contadores de<br>
        <span class="gradient-text">Clientes</span>
      </h1>

      <p class="hero__desc">
        Administrador de Contadores
      </p>

      <NuxtLink to="/contadores" class="btn-premium">
        Comenzar →
      </NuxtLink>
    </div>
  </main>
</template>

<script setup lang="ts">
// Tu lógica vendrá luego, disfruta el viaje visual por ahora.
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap');

:global(html) {
  font-family: 'Ubuntu', sans-serif;
  scroll-behavior: smooth;
}

:global(body) {
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #0f172a, #1751f1, #9333ea);
  background-size: 400% 500%;
  animation: bgFlow 20s ease infinite;
  color: #bcdeff;
  overflow-x: hidden;
}

@keyframes bgFlow {
  0%, 100% { background-position: 0% 20%; }
  60% { background-position: 100% 60%; }
}

.hero {
  min-height: 100dvh;
  display: grid;
  place-items: center;
  padding: 1rem;
  text-align: center;

  &__inner {
    max-width: 900px;
    padding: 1rem;
    animation: fadeIn 1.5s ease-out forwards;
    opacity: 1;
  }

  &__title {
    font-size: clamp(2.5rem, 7vw, 4.5rem);
    font-weight: 900;
    line-height: 1.1;
    opacity: 0;
    animation: fadeUp 1s ease-out 0.2s forwards;

    /* Ajuste para que el título no quede muy arriba */
    margin-top: -5rem;

    @media (max-width: 425px) {
      margin-top: -3rem;
    }
  }

  &__desc {
    font-size: 1.125rem;
    line-height: 1.6;
    margin: 1.5rem 0 2.5rem;
    opacity: 0;
    animation: fadeUp 1s ease-out 0.5s forwards;
  }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.gradient-text {
  background: linear-gradient(90deg, #facc15, #fb7185, #a78bfa);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.btn-premium {
  display: inline-block;
  padding: 0.85rem 1.8rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 1.1rem;
  color: white;
  background: linear-gradient(to right, #f852a5, #ff6a00);
  box-shadow: 0 0 15px rgba(255, 105, 180, 0.4), 0 0 30px rgba(255, 105, 180, 0.2);
  transition: all 0.3s ease-in-out;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.2), transparent 70%);
    transform: rotate(45deg);
    animation: pulse 3s infinite linear;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(255, 105, 180, 0.6), 0 0 35px rgba(255, 105, 180, 0.3);
  }
}

@keyframes pulse {
  0% {
    transform: rotate(45deg) scale(1);
    opacity: 0.4;
  }
  50% {
    transform: rotate(45deg) scale(1.5);
    opacity: 0.2;
  }
  100% {
    transform: rotate(45deg) scale(1);
    opacity: 0.4;
  }
}
</style>
