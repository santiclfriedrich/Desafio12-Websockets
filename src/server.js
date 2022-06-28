const express = require('express');
const app = express();
const puerto = 8080;
const path = require('path');
const expressServer = app.listen(puerto, () => {
    try{
        console.log(`Servidor escuchando el puerto: ${puerto}`)
    }
    catch(error){
        console.log("No se pudo iniciar el servidor: ", error);
    }
});

const { Server: IOServer } = require('socket.io');
const io = new IOServer(expressServer);


//Array
const msgArray = [];
const productos = [
    {
        "id": 1,
        "url": "https://cdn2.iconfinder.com/data/icons/shoes-7/128/flat-04-512.png",
        "price": 14500,
        "description": "Vans Old Skool"
    },
    {
        "id": 2,
        "url": "https://cdn1.iconfinder.com/data/icons/sneakers-2/100/10-512.png",
        "price": 10000,
        "description": "Converse Chuck Taylor"
    },
    {
        "id": 3,
        "url": "https://cdn1.iconfinder.com/data/icons/cool-shoes/200/ziyuan_19-256.png",
        "price": 40000,
        "description": "Nike Jordan"
    },
    {
        "id": 5,
        "url": "https://cdn2.iconfinder.com/data/icons/shoes-6/128/outline_col-03-256.png",
        "price": 8000,
        "description": "Adidas Original"
    }
];

//CONTAINER ARCHIVOS
const Contenedor = require('./contenedor.js');
chatLog = new Contenedor;


//ACCESO AL BODY
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//RUTAS ESTATICAS
app.use(express.static(path.join(__dirname, '../public')));

//IO SOCKETS
io.on('connection', socket => {
    console.log('Entró el cliente con id: ', socket.id);
    //PRODUCTOS
    socket.emit('server:products', productos);
    socket.on('client:product', productoInfo => {
        productos.push(productoInfo);
        io.emit('server:products', productos);
    })
    //MENSAJES
    socket.emit('server:msgs', msgArray);
    socket.on('client:msg', msgInfo => {
        msgArray.push(msgInfo);
        chatLog.save(msgInfo);
        io.emit('server:msgs', msgArray)
    })
})

