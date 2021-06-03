const socketController = (socket) => {
    console.log('cliente conectado ', socket.id);

    socket.on('disconnect', () => {
        console.log('cliente desconectado ', socket.id);
    })

    socket.on('enviar-mensaje', (payload, callback) => {
        const id = payload
        callback(id)

        socket.emit('enviar-mensaje', id)
        socket.broadcast.emit('mensaje-servidor', payload)
    })

    socket.on('chat:Typing', (data) => {
        socket.broadcast.emit('chat:Typing', data)
    })
}

export { socketController }