# cinema-tickets-javascript
# Objective

This is a coding exercise which will allow you to demonstrate the business rules mentioned below.

# Business Rules

- There are 3 types of tickets i.e. Infant, Child, and Adult.

- The ticket prices are based on the type of ticket (see table below).

- The ticket purchaser declares how many and what type of tickets they want to buy.

- Multiple tickets can be purchased at any given time.

- Only a maximum of 20 tickets that can be purchased at a time.

- Infants do not pay for a ticket and are not allocated a seat. They will be sitting on an Adult's lap.

- Child and Infant tickets cannot be purchased without purchasing an Adult ticket.

|   Ticket Type    |     Price   |

| ---------------- | ----------- |

|    INFANT        |    £0       |

|    CHILD         |    £10      |

|    ADULT         |    £20      |

- There is an existing `TicketPaymentService` responsible for taking payments.

- There is an existing `SeatReservationService` responsible for reserving seats.

# Input data 

The Input data for this coding exercise is as follows. 
Input is an object which has tickets array or objects which has type and noOfTickets.
```
{
        tickets: [
          { type: "ADULT", noOfTickets: 2 },
          { type: "CHILD", noOfTickets: 2 },
          { type: "INFANT", noOfTickets: 1 },
        ],
}
```
# Unit test 
- Unit tests are covered in the text\uniy\pairtest\TicketService.test.js
- Unit tests have wiritten only for the main file. (due to time contraints)
- To run the unit test, run the following script in the terminal of this folder.

```
npm run test
```

# Assumption

- This particular code is middle layer so there are no files that calls the main function. The end to end functionality can be run or tested only by unit test.

