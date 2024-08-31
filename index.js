const express = require('express');
const app = express();
app.use(express.json()); // Middleware para parsear JSON

const clientes = [
    { id: 1, nombre: 'Cliente 1' },
    { id: 2, nombre: 'Cliente 2' },
    { id: 3, nombre: 'Cliente 3' }
];

const productos = [
    { id: 1, nombre: 'Producto 1', precio: 10 },
    { id: 2, nombre: 'Producto 2', precio: 20 },
    { id: 3, nombre: 'Producto 3', precio: 30 }
];

// Ruta raíz
app.get('/', (req, res) => {
    res.send('Bienvenido a mi API!');
});

// Rutas para Clientes
app.get('/clientes', (req, res) => {
    res.json(clientes);
});

app.post('/clientes', (req, res) => {
    const nuevoCliente = { id: clientes.length + 1, nombre: req.body.nombre };
    clientes.push(nuevoCliente);
    res.status(201).json(nuevoCliente);
});

app.put('/clientes/:id', (req, res) => {
    const cliente = clientes.find(c => c.id === parseInt(req.params.id));
    if (!cliente) return res.status(404).send('El cliente no se encontró.');

    cliente.nombre = req.body.nombre;
    res.json(cliente);
});

app.delete('/clientes/:id', (req, res) => {
    const clienteIndex = clientes.findIndex(c => c.id === parseInt(req.params.id));
    if (clienteIndex === -1) return res.status(404).send('El cliente no se encontró.');

    const clienteEliminado = clientes.splice(clienteIndex, 1);
    res.json(clienteEliminado);
});

// Rutas para Productos
app.get('/productos', (req, res) => {
    res.json(productos);
});

app.post('/productos', (req, res) => {
    const nuevoProducto = { id: productos.length + 1, nombre: req.body.nombre, precio: req.body.precio };
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
});

app.put('/productos/:id', (req, res) => {
    const producto = productos.find(p => p.id === parseInt(req.params.id));
    if (!producto) return res.status(404).send('El producto no se encontró.');

    producto.nombre = req.body.nombre;
    producto.precio = req.body.precio;
    res.json(producto);
});

app.delete('/productos/:id', (req, res) => {
    const productoIndex = productos.findIndex(p => p.id === parseInt(req.params.id));
    if (productoIndex === -1) return res.status(404).send('El producto no se encontró.');

    const productoEliminado = productos.splice(productoIndex, 1);
    res.json(productoEliminado);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`);
});
