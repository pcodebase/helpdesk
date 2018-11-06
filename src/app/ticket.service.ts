import { Injectable } from '@angular/core';
import { Ticket } from './models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  tickets: Ticket[];

  constructor() {
    // this.tickets = [
    //   {title: 'Create a Website', description: 'Create a wordpress website', hide: true},
    //   {title: 'write a document', description: 'Do other stuff', hide: true}
    // ];
  }

  getTickets() {
    if(localStorage.getItem('tickets') === null) {
      this.tickets = [];
    } else {
      this.tickets = JSON.parse(localStorage.getItem('tickets'));
    }
    return this.tickets;
  }

  addTicket(ticket: Ticket) {
    this.tickets.push(ticket);
    let tickets = [];
    if(localStorage.getItem('tickets') === null) {
      tickets = [];
      tickets.push(ticket);
      localStorage.setItem('tickets', JSON.stringify(tickets));
    } else {
      tickets = JSON.parse(localStorage.getItem('tickets'));
      tickets.push(ticket); 
      localStorage.setItem('tickets', JSON.stringify(tickets));
    }
  }

  deleteTicket(ticket: Ticket) {
    for (let i = 0; i < this.tickets.length; i++) {
      if (ticket == this.tickets[i]) {
        this.tickets.splice(i, 1);
        localStorage.setItem('tickets', JSON.stringify(this.tickets));
      }
    }
  }
}