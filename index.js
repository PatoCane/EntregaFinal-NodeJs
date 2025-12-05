import express from "express"
import cors from "cors"

import rutasLog from "./src/routes/auth.routes.js"
import rutasProductos from "./src/routes/products.routes.js"

const app = express();
const PORT = process.env.PORT || 3000; 

const corsConfig = {
    // CAMBIAR A TU DOMINIO DE VERSEL AQUÍ
    origin: ['http://localhost:3000', 'https://entrega-final-lac.vercel.app'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    exposedHeaders: ['Content-Length'], 
    credentials: true, 
    maxAge: 600, 
    optionsSuccessStatus: 204 
}

app.use(cors(corsConfig))
app.use(express.json()) // Línea única y correcta

app.use("/api", rutasLog)
app.use("/api", rutasProductos)

// Manejadores de errores y 404
app.use((req, res, next) => {
    console.log(`Datos received at:  ${req.method} ${req.url}`);
    next();
});

app.use((req, res, next) => {
    res.status(404).send('Recurso no encontrado o ruta inválida');
});

// ***********************************************
// ESTO REEMPLAZA AL APP.LISTEN()
// ***********************************************

// Si usas require (CommonJS)
// module.exports = app; 

// Si usas import (Módulos ES6) <-- Este es tu caso
export default app;