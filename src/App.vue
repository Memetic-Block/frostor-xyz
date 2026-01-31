<template>
  <div class="app min-h-screen flex flex-col bg-background text-foreground">
    <SiteHeader />
    <main class="container-page py-8 flex-grow">
      <RouterView />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import { useHead } from '@unhead/vue'

useHead({
  titleTemplate: (title) => title ? `${title} | Frostor` : 'Frostor',
  meta: [
    { name: 'description', content: 'Content ownership and permanence on Arweave' },
    { property: 'og:site_name', content: 'Frostor' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
  link: [
    { rel: 'canonical', href: 'https://frostor.xyz' },
  ],
})
</script>
