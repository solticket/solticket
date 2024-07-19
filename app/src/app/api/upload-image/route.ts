import Arweave from 'arweave'
import fs from 'fs'
import { uploadImageSchema } from '../../../schema/event.schema'
import { z } from 'zod'

const filePath = '.local_keys/arweave_key.json'

export async function POST(request: Request) {
  const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
  })

  const data = await request.json()

  try {
    const validatedBody = uploadImageSchema.parse(data)
    const wallet = JSON.parse(fs.readFileSync(filePath).toString())

    const transaction = await arweave.createTransaction(
      { data: Buffer.from(validatedBody.image, 'base64') },
      wallet,
    )
    transaction.addTag('Content-Type', 'image/jpeg')

    await arweave.transactions.sign(transaction, wallet)
    const response = await arweave.transactions.post(transaction)

    if (response.status !== 200) return new Response('Error', { status: 400 })

    const url = `https://arweave.net/${transaction.id}`

    return new Response(url)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Invalid body', { status: 400 })
    }
    return new Response('Error', { status: 400 })
  }
}
