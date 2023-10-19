import ServerlessHttp from 'serverless-http'
import express, { Router } from 'express'
import { isAuthorized } from '@tinacms/auth'
import { createMediaHandler } from 'next-tinacms-dos/dist/handlers'

const app = express()

const router = Router()

const mediaHandler = createMediaHandler({
  // ...
  config: {
    endpoint: process.env.SPACES_ENDPOINT,
    credentials: {
      accessKeyId: process.env.SPACES_KEY || '',
      secretAccessKey: process.env.SPACES_SECRET_KEY || '',
    },
    region: 'nyc3',
  },
  bucket: process.env.SPACES_NAME || '',
  authorized: async (req, _res) => {
    try {
      if (process.env.NODE_ENV == 'development') {
        return true
      }

      const user = await isAuthorized(req)

      return user && user.verified
    } catch (e) {
      console.error(e)
      return false
    }
  },
})

router.get('/dos/media', mediaHandler)

router.post('/dos/media', mediaHandler)

router.delete('/dos/media/:media', (req, res) => {
  req.query.media = ['media', req.params.media]
  return mediaHandler(req, res)
})

app.use('/api/', router)
app.use('/.netlify/functions/api/', router)

export const handler = ServerlessHttp(app)