const socket = io();
//FORM PRODUCTO

const formProduct = document.querySelector('#formProduct');
const urlInput = document.querySelector('#urlInput');
const priceInput = document.querySelector('#priceInput');
const descInput = document.querySelector('#descInput');

//FORM MENSAJES
const formMsg = document.querySelector('#formMsg');
const usernameInput = document.querySelector('#usernameInput');
const msgInput = document.querySelector('#msgInput');
const msgsPool = document.querySelector('#msgsPool');

//------------------------------------------------FUNCIONES-------------------------------------------------------//



//PRODUCTOS
function sendProduct (productInfo) {
    socket.emit('client:product', productInfo)
};
async function renderProducts (productos) {
    const response = await fetch('/partials/listProducts.ejs');
    const pagina = await response.text();
    document.querySelector('#producInTable').innerHTML = "";
    productos.forEach(product => {
        const html = ejs.render(pagina, product);
        document.querySelector('#producInTable').innerHTML += html;
    });
}
function submitHandlerProduct (event) {
    event.preventDefault();
    const productoInfo = { url: urlInput.value, price: priceInput.value, description: descInput.value };
    sendProduct(productoInfo);
};



// MENSAJES
function sendMsg (msgInfo) {
    socket.emit('client:msg', msgInfo);
}
function renderMsgs (msgsInfo) {
    const html = msgsInfo.map(msgInfo => {
        return(`<div>
        <span class="msgsPool-user">${msgInfo.username}</span>
        [<span class="msgsPool-date">${msgInfo.time}<span>]: 
        <span class="msgsPool-msg">${msgInfo.message}</span>
        </div>`)
    }).join(" ");
    msgsPool.innerHTML = html;
}
function submitHandlerMsg (event) {
    event.preventDefault();
    const timeStamp = new Date();
    const fechayhora = timeStamp.toLocaleString("fr-FR");
    const msgInfo = { username: usernameInput.value, time: fechayhora, message: msgInput.value };
    sendMsg(msgInfo);
}

//---------------------------------------------------EVENTOS------------------------------------//



//MENSAJES
formMsg.addEventListener('submit', submitHandlerMsg);
socket.on('server:msgs', renderMsgs);



//PRODUCTOS
formProduct.addEventListener('submit', submitHandlerProduct)
socket.on('server:products', renderProducts);