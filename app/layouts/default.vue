<template>
  <div class="min-h-screen bg-slate-950 text-slate-200">
    <header class="sticky top-0 border-b border-white/10 backdrop-blur bg-slate-950/60">
      <div class="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
        <NuxtLink to="/contadores">Contadores</NuxtLink>
        <nav class="ml-auto flex gap-4 text-sm">
          <NuxtLink to="/" class="hover:underline">Inicio</NuxtLink>
          <NuxtLink to="/clientes">Contadores</NuxtLink>
        </nav>
      </div>
    </header>
    <main class="max-w-5xl mx-auto p-4">
      <slot />
    </main>
  </div>
</template>
