<template>
  <div class="index-page">
    <div class="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
      <!-- Left column: Logo and tagline -->
      <div class="text-center mt-16 md:mt-48 lg:mt-56 xl:mt-96">
        <LogoBanner />
        <p class="text-sm md:text-base lg:text-lg font-light mt-4">
          Content ownership and permanence on Arweave
        </p>
      </div>

      <!-- Right column: Splash image -->
      <div class="flex justify-center md:justify-end">
        <img
          src="/WNrAt3Fn4P8Uw1rJus5zjdgpNyfu5qM0T4JY5JhAyJc.gif"
          alt="Frostor splash"
          class="w-[350px] sm:w-[620px] md:w-[500px] lg:w-[620px] xl:w-[960px] h-auto object-contain"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import LogoBanner from '@/components/LogoBanner.vue'

useHead({
  title: 'Frostor',
  link: [{ rel: 'canonical', href: 'https://frostor.xyz' }]
})
</script>
