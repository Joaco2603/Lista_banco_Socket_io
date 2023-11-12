
const TicketContro = require('../models/ticket-control')

const ticketControl = new TicketContro();


const socketController = (socket) => {
    

    socket.emit('ultimo-ticket',ticketControl.ultimo);
    socket.emit('estado-actual',ticketControl.ultimos4);

    socket.on('siguiente-ticket', ( payload, cb ) => {
        
        const siguiente = ticketControl.siguiente();
        cb(siguiente);
        return socket.broadcast.emit('siguiente-ticket-server',siguiente)
    })

    socket.on('atender-ticket',({escritorio},cb)=>{
        if( !escritorio )
        {
            return cb({
                ok:false,
                msg:'El escritorio es obligatorio'
            })
        }

        const ticket = ticketControl.atenderTicket(escritorio);
  

        if(!ticket){
            return cb({
                ok:false,
                msg:'Ya no hay tickets pendientes'
            })
        }

        if(!ticket)
        {
            return cb({
                ok:false,
                msg: 'Ya no hay tickets pendientes'
            })
        }
        socket.broadcast.emit('estado-actual',ticketControl.ultimos4)
        cb({
            ok:true,
            ticket
        })

    })
}



module.exports = {
    socketController
}

