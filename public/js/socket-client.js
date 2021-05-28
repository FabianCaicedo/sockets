const socket = io();

const IblOnline = document.querySelector('#IblOnline');
const IblOffline = document.querySelector('#IblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');


socket.on('connect', () => {
    IblOnline.style.display = ''
    IblOffline.style.display = 'none'
});

socket.on('disconnect', () => {
    IblOnline.style.display = 'none'
    IblOffline.style.display = ''
});

socket.on('mensaje-servidor', (payload) => {
    console.log(payload);
});

btnEnviar.addEventListener('click', () => {
    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id: '123abc',
        fecha: new Date().getTime()
    }

    socket.emit('enviar-mensaje', payload, (id) => {
        console.log('respuesta desde el servidor', id);
    });
})