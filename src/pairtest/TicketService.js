import InvalidPurchaseException from './lib/InvalidPurchaseException.js';
import TicketRequest from './lib/TicketRequest.js';
import TicketPaymentService from '../thirdparty/paymentgateway/TicketPaymentService.js';
import SeatReservationService from '../thirdparty/seatbooking/SeatReservationService.js';

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, ...ticketTypeRequests) {
    try {

          ticketTypeRequests.forEach(ticketTypeRequest => {

          const ticketRequest = new TicketRequest(ticketTypeRequest);
          ticketRequest.validateTicketRequest();
          const totalSeatsToAllocate = ticketRequest.getTotalSeatsToAllocates()
          const totalPrice = ticketRequest.getTotalAmountToPay();
          const ticketPaymentService = new TicketPaymentService()
          ticketPaymentService.makePayment(accountId, totalPrice);
          const seatReservationService = new SeatReservationService()
          console.log('totalSeatsToAllocate',totalSeatsToAllocate);
          seatReservationService.reserveSeat(accountId, totalSeatsToAllocate)
      })
    } catch (error) {
      throw new InvalidPurchaseException(error.message);
    }
  }
}
