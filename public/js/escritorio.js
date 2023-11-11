
const socket = io();

const lblEscrito = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblTicket  = document.querySelector('small');
const divAlerta  = document.querySelector('.alert');

const searchParams = new URLSearchParams(window.location.search);

if( !searchParams.has('escritorio') )
{
    window.location =  'index.html'
    throw new Error('El escrito es obligatorio')
}

const escritorio = searchParams.get('escritorio');

lblEscrito.innerText = 'Escritorio ' + escritorio;

divAlerta.style.display = 'none';


socket.on('connect', () => {
    btnAtender.disabled = false;
});

socket.on('disconnect', () => {
    btnAtender.disabled = true;
});

// socket.on('ultimo-ticket',(payload)=>{
//     lblNuevoTicket.innerText = 'Ticket ' + payload;
// })

// socket.on('siguiente-ticket-server',(payload)=>{
//     lblNuevoTicket.innerText = payload;
// })

btnAtender.addEventListener( 'click', () => {

    socket.emit( 'atender-ticket', { escritorio } , ( {ok,ticket,msg} ) => {
        if(!ok)
        {
            lblTicket.innerText = `Exelente trabajo sigue asi :)`
            return divAlerta.style.display = '';
        }
        lblTicket.innerText = `Ticket ${ticket.numero}`
    });

});