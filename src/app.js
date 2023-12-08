import express from 'express'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'
import { Server } from "socket.io"

import { __dirname } from './utils.js'
import viewsRouter from './routes/views.routes.js'
import productsRouter from './routes/products.routes.js'
import cartsRouter from './routes/carts.routes.js'
// coder_55605

const PORT = 8080
const MONGOOSE_URL = 'mongodb+srv://coder_55605:coder_55605@cluster0.fuyh6ix.mongodb.net/?retryWrites=true&w=majority' //ATLAS

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

try {
    await mongoose.connect(MONGOOSE_URL, { dbName: 'coder_55605' })
    const app = express()
    const httpServer = app.listen(PORT, () => {
        console.log(`Backend activo puerto ${PORT} conectado a BBDD: "prueba-de-atlas"`)
    })
    
    const socketServer = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],
            credentials: false
        } 
    })
    
    socketServer.on('connection', socket => {
        socket.on('new_message', data => {
            socketServer.emit('message_added', data)
        })
    })

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.engine('handlebars', handlebars.engine())
    app.set('views', `${__dirname}/views`)
    app.set('view engine', 'handlebars')
    app.set('socketServer', socketServer)

    app.use('/', viewsRouter)
    app.use('/api/products', productsRouter)
    app.use('/api/carts', cartsRouter)
    app.use('/static', express.static(`${__dirname}/public`))

    socketServer.on('connect', () => {
        console.log('User connected');
    });
} catch(err) {
    console.log(`Backend: error al inicializar (${err.message})`)
}