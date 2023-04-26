import sinon from "sinon";
import assert from "assert";
import TicketService from "../../../src/pairtest/TicketService.js";
import TicketRequest from "../../../src/pairtest/lib/TicketRequest.js";
import SeatReservationService from "../../../src/thirdparty/seatbooking/SeatReservationService.js";
import TicketPaymentService from "../../../src/thirdparty/paymentgateway/TicketPaymentService.js";

describe("Ticket Service", () => {
  describe("When seat reservation and ticket payment succeeds", () => {
    let makePaymentStub;
    let reserveSeatStub;

    before(()=>{
        makePaymentStub = sinon.stub(TicketPaymentService.prototype,'makePayment')
        reserveSeatStub = sinon.stub(SeatReservationService.prototype,'reserveSeat')
    })
    after(()=>{
        makePaymentStub.restore();
    })
    it("should not throw any error and its a happy path", () => {
      const ticketTypeRequests = {
        tickets: [
          { type: "ADULT", noOfTickets: 2 },
          { type: "CHILD", noOfTickets: 2 },
          { type: "INFANT", noOfTickets: 1 },
        ],
      };
      const ticketService = new TicketService();
      ticketService.purchaseTickets(1010, ticketTypeRequests);
      sinon.assert.calledWith(makePaymentStub,1010,60);
      sinon.assert.calledWith(reserveSeatStub,1010,4);
    });
  });
  describe("When there are more than 20 no. of tickets", () => {
    it("should throw an error that there are more than 20 tickets", () => {
      try {
        const ticketTypeRequests = {
          tickets: [
            { type: "ADULT", noOfTickets: 15 },
            { type: "CHILD", noOfTickets: 15 },
            { type: "INFANT", noOfTickets: 15 },
          ],
        };
        const ticketService = new TicketService();
        ticketService.purchaseTickets(100, ticketTypeRequests);
      } catch (error) {
        assert.equal(error.name, "InvalidPurchaseException");
        assert.equal(
          error.message,
          "Total No. of Tickets cannot be more than 20"
        );
      }
    });
  });
  describe("When there are no adults tickets", () => {
    it("should throw an error that there are more than 20 tickets", () => {
      try {
        const ticketTypeRequests = {
          tickets: [
            { type: "CHILD", noOfTickets: 10 },
            { type: "INFANT", noOfTickets: 5 },
          ],
        };
        const ticketService = new TicketService();
        ticketService.purchaseTickets(100, ticketTypeRequests);
      } catch (error) {
        assert.equal(error.name, "InvalidPurchaseException");
        assert.equal(
          error.message,
          "There should be atleast one Adult ticket to be purchased"
        );
      }
    });
  });
  describe("When the accountId is not an integer", () => {
    it("should throw an error accountId must be an integer", () => {
      try {
        const ticketTypeRequests = {
          tickets: [
            { type: "ADULT", noOfTickets: 10 },
            { type: "CHILD", noOfTickets: 5 },
            { type: "INFANT", noOfTickets: 5 },
          ],
        };
        const ticketService = new TicketService();
        ticketService.purchaseTickets("abc", ticketTypeRequests);
      } catch (error) {
        assert.equal(error.name, "InvalidPurchaseException");
        assert.equal(error.message, "accountId must be an integer");
      }
    });
  });
  describe("When the ticket type is invalid", () => {
    it("it show throw an errror type must be ADULT, CHILD, or INFANT", () => {
      try {
        const ticketTypeRequests = {
          tickets: [
            { type: "PARENT", noOfTickets: 10 },
            { type: "CHILD", noOfTickets: 5 },
            { type: "INFANT", noOfTickets: 5 },
          ],
        };
        const ticketService = new TicketService();
        ticketService.purchaseTickets(100, ticketTypeRequests);
      } catch (error) {
        assert.equal(error.name, "InvalidPurchaseException");
        assert.equal(error.message, "type must be ADULT, CHILD, or INFANT");
      }
    });
  });
  describe("When the totalAmountToPay type is not an integer", () => {
    before(() => {
      sinon.stub(TicketRequest.prototype, "getTotalAmountToPay").returns("abc");
    });
    after(() => {
      sinon.restore();
    });
    it("it show throw an errror totalAmountToPay must be an intege", () => {
      try {
        const ticketTypeRequests = {
          tickets: [{ type: "ADULT", noOfTickets: 10 }],
        };
        const ticketService = new TicketService();
        ticketService.purchaseTickets(100, ticketTypeRequests);
      } catch (error) {
        assert.equal(error.name, "InvalidPurchaseException");
        assert.equal(error.message, "totalAmountToPay must be an integer");
      }
    });
  });
  describe("When the totalSeatsToAllocate type is not an integer", () => {
    before(() => {
      sinon
        .stub(TicketRequest.prototype, "getTotalSeatsToAllocates")
        .returns("xyz");
    });
    after(() => {
      sinon.restore();
    });
    it("it show throw an errror totalSeatsToAllocate must be an intege", () => {
      try {
        const ticketTypeRequests = {
          tickets: [{ type: "ADULT", noOfTickets: 10 }],
        };
        const ticketService = new TicketService();
        ticketService.purchaseTickets(100, ticketTypeRequests);
      } catch (error) {
        assert.equal(error.name, "InvalidPurchaseException");
        assert.equal(error.message, "totalSeatsToAllocate must be an integer");
      }
    });
  });
});
