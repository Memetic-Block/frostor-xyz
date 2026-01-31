<template>
  <div class="logo-banner flex items-center" :class="props.small ? 'justify-start' : 'justify-center'">
    <img
      src="/logo-black.png"
      alt="Frostor logo"
      class="inline-block m-2"
      :class="logoSizeClass"
    />
    <h1
      class="logo-text inline-block"
      :class="textSizeClass"
    >
      Frostor
    </h1>
  </div>
</template>

<style scoped>
.logo-text {
  font-family: 'Berkeley Mono', monospace;
  align-self: center;
}
</style>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ small?: boolean }>()

const logoSizeClass = computed(() => {
  if (props.small) {
    return 'w-8 h-8'
  }
  return 'w-12 h-12 sm:w-12 sm:h-12 md:w-15 md:h-15 lg:w-24 lg:h-24 xl:w-24 xl:h-24'
})

const textSizeClass = computed(() => {
  if (props.small) {
    return 'text-xl font-light'
  }
  return 'text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-thin'
})
</script>
