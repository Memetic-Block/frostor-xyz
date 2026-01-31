<template>
  <div class="logo-banner flex items-center justify-start">
    <h1
      class="logo-text inline-block"
      :class="textSizeClass"
    >
      Frostor.xyz
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

const textSizeClass = computed(() => {
  if (props.small) {
    return 'text-xl font-light'
  }
  return 'text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-thin'
})
</script>
