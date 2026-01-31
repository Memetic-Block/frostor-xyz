import { ANT, ArweaveSigner } from '@ar.io/sdk'
import { TurboFactory } from '@ardrive/turbo-sdk'
import Arweave from 'arweave'

// ANT-FROSTOR
const processId = process.env.PROCESS_ID || 'qtW4J30UzkdiBJpJe6qcmm-YfFe3EFQCPbZ2jBlTHTM'
const PRIVATE_KEY_BASE64 = process.env.PRIVATE_KEY_BASE64 || ''
if (!PRIVATE_KEY_BASE64) {
  throw new Error('PRIVATE_KEY_BASE64 is not set!')
}
const DEPLOY_FOLDER = `${process.cwd()}/dist`
const gatewayUrl = process.env.GATEWAY || 'https://arweave.net'
const url = process.env.BUNDLER || 'https://upload.ardrive.io'

let undername = 'dev'
if (process.env.PHASE === 'stage') {
  undername = 'stage'
} else if (process.env.PHASE === 'live') {
  undername = '@'
} else if (process.env.UNDERNAME) {
  undername = process.env.UNDERNAME
}

async function deploy() {
  console.log(`Deploying to Arweave via ${url} with gateway ${gatewayUrl} and process ID ${processId}`)
  const jwk = JSON.parse(Buffer.from(PRIVATE_KEY_BASE64, 'base64').toString('utf-8'))
  const arweave = Arweave.init({})
  const address = await arweave.wallets.jwkToAddress(jwk)
  const signer = new ArweaveSigner(jwk)
  const turbo = TurboFactory.authenticated({
    signer,
    gatewayUrl,
    uploadServiceConfig: { url }
  })
  const ant = ANT.init({ processId, signer })

  console.info(`Deploying as ${address} to undername ${undername}`)

  const {
    fileResponses,
    manifestResponse,
    manifest,
    errors
  } = await turbo.uploadFolder({
    folderPath: DEPLOY_FOLDER,
    dataItemOpts: {
      tags: [{ name: 'Deploy-Nonce', value: Date.now().toString() }]
    },
    manifestOptions: {
      indexFile: 'index.html',
      fallbackFile: 'index.html'
    }
  })

  if (errors && errors.length > 0) {
    console.error(errors)
    throw new Error('Deploy failed, see errors above')
  }
  if (!manifestResponse) {
    throw new Error('No manifest response')
  }

  console.info(`Manifest id ${manifestResponse.id}`)
  console.info('Manifest', JSON.stringify(manifest))
  console.info('Updating ANT undername', undername)
  const { id: messageId } = undername === '@'
    ? await ant.setBaseNameRecord({
      transactionId: manifestResponse.id,
      ttlSeconds: 3600
    })
    : await ant.setUndernameRecord({
      undername,
      transactionId: manifestResponse.id,
      ttlSeconds: 3600
    })
  console.info(
    'Deployed!  Please wait 20 - 30 minutes for ARNS to update!',
    `https://aolink.frostor.xyz/#/message/${messageId}`
  )
}

deploy().catch(err => {
  console.error('error deploying!', err);
  process.exit(1);
})
