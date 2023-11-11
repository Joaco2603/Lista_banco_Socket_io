
const TicketContro = require('../models/ticket-control')

const ticketControl = new TicketContro();


const socketController = (socket) => {
    

    socket.emit('ultimo-ticket',ticketControl.ultimo)

    socket.on('siguiente-ticket', ( payload, cb ) => {
        
        const siguiente = ticketControl.siguiente();
        cb(siguiente);
        return socket.broadcast.emit('siguiente-ticket-server',siguiente)
    })

    socket.on('atender-ticket',({escritorio},cb)=>{
        console.log(escritorio)
        if( !escritorio )
        {
            return cb({
                ok:false,
                msg:'El escritorio es obligatorio'
            })
        }

        const ticket = ticketControl.atenderTicket(escritorio);
        if(!ticket){
            cb({
                ok:false,
                msg:'Ya no hay tickets pendientes'
            })
        }

        if(!ticket)
        {
            cb({
                ok:false,
                msg: 'Ya no hay tickets pendientes'
            })
        }

        cb({
            ok:true,
            ticket
        })

    })
}



module.exports = {
    socketController
}

