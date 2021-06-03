const socket = io();

const IblOnline = document.querySelector('#IblOnline');
const IblOffline = document.querySelector('#IblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');
const output = document.querySelector('#output');
const actions = document.querySelector('#actions');

socket.on('connect', () => {
    IblOnline.style.display = ''
    IblOffline.style.display = 'none'
});

socket.on('disconnect', () => {
    IblOnline.style.display = 'none'
    IblOffline.style.display = ''
});

socket.on('mensaje-servidor', (payload) => {
    actions.innerHTML = ''
    output.innerHTML += `<p>
    <strong>${payload.mensaje}</strong>
    ${payload.fecha}, ${payload.id}
    </p>`
});

socket.on('enviar-mensaje', (payload) => {
    actions.innerHTML = ''
    output.innerHTML += `<p>
    <strong>TU: ${payload.mensaje}</strong>
    </p>`
});

socket.on('chat:Typing', (data) => {
    actions.innerHTML = `<p>
    <em>esta escirbiendo un mensaje</em>
    </p>`
});

btnEnviar.addEventListener('click', () => {
    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id: '123abc',
        fecha: new Date().getTime()
    }

    socket.emit('enviar-mensaje', payload, (id) => {
        console.log('tu', id);
    });

});

txtMensaje.addEventListener('keypress', () => {
    socket.emit('chat:Typing')
});