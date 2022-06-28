require('dotenv').config();
const cors = require('cors');
const express = require('express')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usuariosRoutes = '/api/usuarios'

        this.middlewares()

        this.routes()
        
    }

    middlewares () {
        this.app.use(cors())
        this.app.use(express.static('public'))
        this.app.use(express.json())
    }

    routes() {

        this.app.use(this.usuariosRoutes, require('../routes/user'))
    }

    listen() {
        this.app.listen(this.port)
    }

}

module.exports = Server;