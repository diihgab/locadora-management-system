const express = require('express');
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:8080', // Allow Vue.js frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

const prisma = new PrismaClient();

// Function to try connecting to the database
const connectDB = async (retries = 5) => {
    while (retries) {
        try {
            await prisma.$connect();
            console.log('Successfully connected to database');
            return true;
        } catch (e) {
            console.log(`Failed to connect to database. Retries left: ${retries}`);
            retries--;
            // Wait 5 seconds before retrying
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
    return false;
};

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Erro interno do servidor',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Rotas CRUD para filmes
app.get('/filmes', async (req, res, next) => {
    try {
        const filmes = await prisma.filme.findMany();
        res.json(filmes);
    } catch (error) {
        next(error);
    }
});

app.post('/filmes', async (req, res, next) => {
    try {
        const { titulo, genero, anoLancamento, status } = req.body;
        const filme = await prisma.filme.create({
            data: { titulo, genero, anoLancamento, status },
        });
        res.status(201).json(filme);
    } catch (error) {
        next(error);
    }
});

app.put('/filmes/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { titulo, genero, anoLancamento, status } = req.body;
        const filme = await prisma.filme.update({
            where: { id: parseInt(id) },
            data: { titulo, genero, anoLancamento, status },
        });
        res.json(filme);
    } catch (error) {
        next(error);
    }
});

app.delete('/filmes/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await prisma.filme.delete({
            where: { id: parseInt(id) },
        });
        res.json({ message: 'Filme deletado com sucesso' });
    } catch (error) {
        next(error);
    }
});

const PORT = process.env.PORT || 3000;

// Start server only after attempting database connection
const startServer = async () => {
    const isConnected = await connectDB();
    if (isConnected) {
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } else {
        console.error('Failed to connect to database after multiple retries');
        process.exit(1);
    }
};

startServer();