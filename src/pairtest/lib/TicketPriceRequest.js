/**
 * Immutable Object.
 */

export default class TicketPriceRequest {
  #price;
  #type;
  #noOfTickets;

  constructor(type, noOfTickets) {
    this.#type = type;
    this.#noOfTickets = noOfTickets;
  }

  getPrice() {
    const index = this.#Type.indexOf(this.#type)
    this.#price = this.#Price[index] * this.#noOfTickets
    return this.#price;
  }

  #Type = ['ADULT', 'CHILD', 'INFANT'];
  #Price = [20, 10, 0];

}
