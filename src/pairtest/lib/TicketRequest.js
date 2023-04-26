import TicketPriceRequest from './TicketPriceRequest.js';
import TicketTypeRequest from './TicketTypeRequest.js';

export default class TicketRequest {

  #totalNoOfTickets;
  #totalNoOfInfantTickets;
  #totalAmountToPay;
  #hasAdultTicket;

  constructor(ticketTypeRequest) {
    const { tickets } = ticketTypeRequest;
    let totalAmountToPay = 0; 
    let totalNoOfTickets = 0; 
    let totalNoOfInfantTickets = 0;

    tickets.forEach((ticket) => {
      const ticketTypeRequest = new TicketTypeRequest(ticket.type, ticket.noOfTickets);
      const ticketType = ticketTypeRequest.getTicketType();
      const noOfTickets = ticketTypeRequest.getNoOfTickets();
      const ticketPrice = new TicketPriceRequest(ticketType, noOfTickets)
      totalAmountToPay += Number.parseInt(ticketPrice.getPrice());
      totalNoOfTickets += noOfTickets;
      if (ticketType === 'ADULT') {
        this.#hasAdultTicket = true;
      }
      if (ticketType === 'INFANT') {
        totalNoOfInfantTickets += noOfTickets;
      }
    });
    this.#totalNoOfTickets = totalNoOfTickets;
    this.#totalNoOfInfantTickets = totalNoOfInfantTickets;
    this.#totalAmountToPay = totalAmountToPay;
  }
  validateTicketRequest() {
    if (!this.#hasAdultTicket) {
      throw new TypeError('There should be atleast one Adult ticket to be purchased');
    }
    if (Number.parseInt(this.#totalNoOfTickets) > 20) {
      throw new TypeError('Total No. of Tickets cannot be more than 20');
    }
  }
  getTotalSeatsToAllocates() {
    return this.#totalNoOfTickets - this.#totalNoOfInfantTickets;
  }
  getTotalAmountToPay() {
    return Number.parseInt(this.#totalAmountToPay);
  }

}
