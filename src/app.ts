import dotenv from 'dotenv'

// load environment variabels
console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV === 'development') {
    dotenv.config({ path: `.development.env` })
} else {
    dotenv.config({ path: '.env' })
}

const PORT = process.env.PORT || 3000;

import express, { Express, Request, Response } from 'express'
import expressLayout from 'express-ejs-layouts'
import morgan from 'morgan'

const app: Express = express()

// setting view engine
app.set('view engine', 'ejs')

// setting middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// middleware:expressLayout
app.use(expressLayout)
app.set("layout", "layout/main");

// middleware:morgan
app.use(morgan('tiny'))

import path from 'path'
// app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(express.static('public'))

import userRoutes from './routes/user'
import apiRoutes from './routes/api'


app.use('/user', userRoutes)
app.use('/api', apiRoutes)

//app.get('/', (req: Request, res: Response) => {
//    res.send('express + typescript')
//})

app.listen(PORT, () => {
    console.log('server ready')
})
