import 'htmx.org'
import './style.css'

const GATEWAY_INFO_URL = 'https://frostor.xyz/ar-io/info'

interface GatewayInfo {
  wallet: string
  processId: string
  release: string
}

const $ = (id: string) => document.getElementById(id)

function setStatus(state: 'loading' | 'online' | 'offline') {
  const el = $('gw-status')
  if (!el) return
  const map = {
    loading: { text: '...', cls: 'text-gray-text' },
    online: { text: 'Online', cls: 'text-green-500' },
    offline: { text: 'Offline', cls: 'text-red-500' },
  } as const
  const { text, cls } = map[state]
  el.textContent = text
  el.className = `font-medium ${cls}`
}

// Gateway status + release from the node's /ar-io/info endpoint
async function loadGatewayInfo() {
  try {
    const res = await fetch(GATEWAY_INFO_URL)
    if (!res.ok) {
      setStatus('offline')
      return
    }
    const info = (await res.json()) as GatewayInfo
    setStatus('online')
    const release = $('gw-release')
    if (release) release.textContent = info.release ?? '—'
  } catch (err) {
    console.error('Failed to fetch gateway info:', err)
    setStatus('offline')
  }
}

setStatus('loading')
void loadGatewayInfo()
