// const http = require('http');

// const hostname = "127.0.0.1";
// const port = 3000;

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('¿Quienes Son?');
// });

// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });
import express from 'express';
import {PORT} from './config.js';
import indexRoutes from './routes/index.routes.js';

const app = express();

app.use(express.json());

app.use(express.static('img'));
app.use(express.static('styles'));
app.use(express.static('view'));

app.use(indexRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint not found'
    });
});

app.listen(PORT);