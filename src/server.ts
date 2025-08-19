import express, {urlencoded, json} from 'express'
import { setupSwagger } from './swagger'
import { notFound } from './middleware/not-found'
import { error } from './middleware/error'

const app = express()

app.use(urlencoded({extended: true}))
app.use(json())

setupSwagger(app)

/**
 * @swagger
 * /:
 *  get:
 *      summary: Home
 *      description: Home
 *      responses:
 *          200:
 *              description: Success
 */

app.get('/', (req, res) => res.send({message: 'Welcome to Appointment Management API'}))

app.use(notFound)
app.use(error)

export default app