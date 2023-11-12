
const socket = io();

const lblEscrito = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblTicket  = document.querySelector('small');
const divAlerta  = document.querySelector('.alert');

const lblPendientes = document.getElementById('lblPendientes');

const searchParams = new URLSearchParams(window.location.search);

if( !searchParams.has('escritorio') )
{
    window.location =  'index.html'
    throw new Error('El escritorio es obligatorio')
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

socket.on('cola',(payload)=>{
    lblPendientes.innerText = payload;
})

socket.on('siguiente-ticket-server',(payload)=>{
    lblTicket.innerText = `Exelente trabajo, tenemos nuevos clientes`
    divAlerta.style.display = 'none';
})

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