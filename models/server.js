require('dotenv').config();
const cors = require('cors');
const express = require('express');
const { dbConnection } = require('../db/config');

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usuariosRoutes = '/api/usuarios'
        this.authRoutes = '/api/auth'

        this.conectarDB()

        this.middlewares()

        this.routes()
        
    }
    async conectarDB() {
        await dbConnection()
    }

    middlewares () {
        this.app.use(cors())
        this.app.use(express.static('public'))
        this.app.use(express.json())
    }

    routes() {

        this.app.use(this.usuariosRoutes, require('../routes/user'))
        this.app.use(this.authRoutes, require('../routes/auth'))
    }

    listen() {
        this.app.listen(this.port)
    }

}

module.exports = Server;