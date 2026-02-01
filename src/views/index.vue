<template>
  <div class="index-page">
    <div class="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
      <!-- Left column: Logo and tagline -->
      <div class="md:flex-1 mt-6 md:mt-12 lg:mt-16 xl:mt-24">
        <LogoBanner />

        <!-- Gateway info -->
        <div class="mt-4 ml-1 text-xs md:text-sm text-gray-text space-y-1">
          <p>Arweave Gateway</p>
          <p>Status: <span :class="isOnline ? 'text-green-500' : 'text-red-500'" class="font-medium">{{ isOnline ? 'Online' : 'Offline' }}</span></p>
          <p>Release: <span class="font-medium text-foreground">{{ gatewayInfo?.release ?? '...' }}</span></p>
          <p>
            Total Staked: <span class="font-medium text-foreground">{{ totalStaked !== null ? formatStake(totalStaked) + ' $ARIO' : '...' }}</span>
          </p>
          <p class="pt-1">
            <a 
              href="https://network-portal.app/#/gateways/36Ar8VmyC7YS7JGaep9ca2ANjLABETTpxSeA7WOV45Y" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
            >
              Stake your $ARIO with frostor.xyz →
            </a>
          </p>
        </div>
      </div>

      <!-- Right column: Splash image -->
      <div class="md:flex-1 flex justify-center md:justify-end">
        <img
          src="/WNrAt3Fn4P8Uw1rJus5zjdgpNyfu5qM0T4JY5JhAyJc.gif"
          alt="Frostor.xyz splash"
          class="w-[350px] sm:w-[620px] md:w-[500px] lg:w-[620px] xl:w-[960px] h-auto object-contain"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useHead } from '@unhead/vue'
import { ARIO } from '@ar.io/sdk'
import LogoBanner from '@/components/LogoBanner.vue'

interface GatewayInfo {
  wallet: string
  processId: string
  release: string
  ans104UnbundleFilter: Record<string, boolean>
  ans104IndexFilter: Record<string, boolean>
  supportedManifestVersions: string[]
  services: {
    bundlers: { url: string }[]
  }
}

const FROSTOR_GATEWAY_ADDRESS = '36Ar8VmyC7YS7JGaep9ca2ANjLABETTpxSeA7WOV45Y'

const gatewayInfo = ref<GatewayInfo | null>(null)
const operatorStake = ref<number | null>(null)
const delegatedStake = ref<number | null>(null)
const loading = ref(true)

const totalStaked = computed(() => {
  if (operatorStake.value === null || delegatedStake.value === null) return null
  return operatorStake.value + delegatedStake.value
})

const isOnline = computed(() => {
  return gatewayInfo.value !== null && !loading.value
})

const formatStake = (mARIO: number) => {
  // Convert from mARIO to ARIO (divide by 1e6) and format with commas
  const ario = mARIO / 1_000_000
  return ario.toLocaleString('en-US', { maximumFractionDigits: 0 })
}

onMounted(async () => {
  try {
    // Fetch gateway info from ar-io endpoint
    const infoResponse = await fetch('https://frostor.xyz/ar-io/info')
    gatewayInfo.value = await infoResponse.json()

    // Fetch stake info from ARIO contract
    const ario = ARIO.mainnet()
    const gateway = await ario.getGateway({ address: FROSTOR_GATEWAY_ADDRESS })
    if (gateway) {
      operatorStake.value = gateway.operatorStake
      delegatedStake.value = gateway.totalDelegatedStake
    }
  } catch (error) {
    console.error('Failed to fetch gateway info:', error)
  } finally {
    loading.value = false
  }
})

useHead({
  title: 'Frostor.xyz - Arweave Gateway',
  link: [{ rel: 'canonical', href: 'https://frostor.xyz' }]
})
</script>
