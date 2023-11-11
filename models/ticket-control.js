const path = require("path");
const fs = require("fs");

class Ticket {
  constructor(numero, escritorio) {
    this.numero = numero;
    this.escritorio = escritorio;
  }
}

class TicketContro {
  constructor() {
    this.ultimo = 0;
    this.hoy = new Date().getDate();
    this.tickets = [];
    this.ultimos4 = [];

    this.init();
  }

  get toJson() {
    return {
      ultimo: this.ultimo,
      hoy: this.hoy,
      ultimos4: this.ultimos4,
      tickets: this.tickets,
    };
  }

  init() {
    const { hoy, tickets, ultimos4, ultimo } = require("../db/data.json");
    if (hoy === this.hoy) {
      this.tickets = tickets;
      this.ultimo = ultimo;
      this.ultimos4 = ultimos4;
    } else {
      this.guardarDb();
    }
  }

  guardarDb() {
    const dbPath = path.join(__dirname, "../db/data.json");
    fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
  }

  siguiente() {
    this.ultimo += 1;
    const ticket = new Ticket(this.ultimo, null);
    this.tickets.push(ticket);

    this.guardarDb();
    return "Ticket " + this.ultimo;
  }

  atenderTicket(escritorio) {
    // No tenemos tickets
    console.log(this.ultimos4)
    if (this.tickets.length === 0) {
      return null;
    }

    const ticket = this.tickets.shift(); // this.tickets[0];
    ticket.escritorio = escritorio;

    this.ultimos4.unshift(ticket);

    if (this.ultimos4.length > 4) {
      this.ultimos4.splice(-1, 1);
    }

    this.guardarDb();

    return ticket;
  }
}

module.exports = TicketContro;
