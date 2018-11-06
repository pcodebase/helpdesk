import { Component, OnInit } from '@angular/core';
import { TicketService } from "../ticket.service";
import { Ticket } from '../models/ticket';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {

  tickets: Ticket[];

  constructor(public ticketService: TicketService) {
    
  }

  ngOnInit() {
    this.tickets = this.ticketService.getTickets();
  }

  addTicket(ticket: Ticket) {
    console.log(ticket);
    this.ticketService.addTicket(ticket);
  }

}