<template>
  <header class="w-full py-4 px-4 md:px-8 fixed top-0 left-0 right-0 z-50 bg-transparent">
    <nav class="max-w-6xl mx-auto flex items-center justify-between">
      <!-- Logo/Brand -->
      <RouterLink to="/" class="flex items-center gap-3 no-underline hover:opacity-80 transition-opacity">
        <LogoBanner small />
      </RouterLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
import LogoBanner from './LogoBanner.vue'
</script>
