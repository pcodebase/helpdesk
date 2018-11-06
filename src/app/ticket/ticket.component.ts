import { Component, OnInit, Input } from '@angular/core';
import { Ticket } from '../models/ticket';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  @Input() ticket: Ticket;
  constructor(public ticketService: TicketService) { }

  ngOnInit() {
  }

  deleteTicket(ticket: Ticket) {
    if(confirm('Are you sure you want to delete this ticket?')) {
      this.ticketService.deleteTicket(ticket);
    }
  }

}
