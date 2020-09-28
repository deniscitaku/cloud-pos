import {TicketLinePayload} from "../../client/Client";

const MAX_TICKETS = 10;

const emptyTicket = {
    ticketLines: [],
    totalAmount: 0
}

const initialState = {
    selectedIndex: 0,
    tickets: [emptyTicket]
};

export const Actions = {
    GOTO_TICKET: 'GOTO_TICKET',
    NEXT_TICKET: 'NEXT_TICKET',
    PREV_TICKET: 'PREV_TICKET',
    NEW_TICKET: 'NEW_TICKET',
    SET_SELECTED_TICKET: 'SET_TICKET',
    REMOVE_SELECTED_TICKET: 'REMOVE_TICKET',
    NEW_TICKET_LINE: 'NEW_TICKET_LINE',
    NEW_TICKET_LINE_FROM_PRODUCT: 'TICKET_LINE_FROM_PRODUCT',
    SET_TICKET_LINE: 'SET_TICKET_LINE',
    REMOVE_TICKET_LINE: 'REMOVE_TICKET_LINE'
}

const saleTabsReducer = (state = initialState, action) => {
    const {type, payload} = action;
    const {selectedIndex, tickets} = state;
    const ticket = tickets[selectedIndex];

    switch (type) {
        case Actions.NEW_TICKET_LINE_FROM_PRODUCT:
            return addNewTicketLineFromProduct();
        case Actions.NEW_TICKET_LINE:
            return addNewTicketLine();
        case Actions.SET_TICKET_LINE:
            return updateTicketLine();
        case Actions.REMOVE_TICKET_LINE:
            return removeTicketLines();
        case Actions.NEW_TICKET:
            return addNewTicket();
        case Actions.SET_SELECTED_TICKET:
            tickets[selectedIndex] = payload.ticket;
            return {...state, tickets: tickets};
        case Actions.REMOVE_SELECTED_TICKET:
            return removeSelectedTicket();
        case Actions.GOTO_TICKET:
            return {...state, selectedIndex: payload.selectedIndex}
        case Actions.NEXT_TICKET :
            return {...state, selectedIndex: (selectedIndex + 1) % tickets.length}
        case Actions.PREV_TICKET :
            return {...state, selectedIndex: (selectedIndex - 1 + tickets.length) % tickets.length}
        default:
            return state;
    }

    function removeSelectedTicket() {
        if (selectedIndex === 0) {
            return {...state, tickets: [emptyTicket]};
        }
        tickets.splice(selectedIndex, 1);
        return {selectedIndex: selectedIndex - 1, tickets: tickets};
    }

    function addNewTicket() {
        if (tickets.length === MAX_TICKETS) {
            return {...state};
        }
        return {selectedIndex: tickets.length - 1, tickets: [...state.tickets, payload.ticket]};
    }

    function addNewTicketLine() {
        ticket.ticketLines = [...ticket.ticketLines, payload];
        setTicketTotal()
        tickets[selectedIndex] = ticket;
        return {...state, tickets: tickets};
    }

    function addNewTicketLineFromProduct() {
        const ticketLine = new TicketLinePayload({
            lineNumber: ticket ? ticket.ticketLines.length + 1 : 1,
            product: payload,
            priceBuy: payload.priceBuy,
            priceSell: payload.priceSell,
            quantity: 1,
            tax: payload.tax,
            amount: payload.priceTax
        });
        ticket.ticketLines = [...ticket.ticketLines, ticketLine];
        setTicketTotal();
        tickets[selectedIndex] = ticket;
        return {...state, tickets: tickets};
    }

    function updateTicketLine() {
        payload.amount = payload.quantity * payload.product.priceTax;
        ticket.ticketLines = ticket.ticketLines
            .map(x => x.lineNumber === payload.lineNumber ? payload : x);
        setTicketTotal();
        tickets[selectedIndex] = ticket
        return {...state, tickets: tickets};
    }

    function removeTicketLines() {
        ticket.ticketLines = ticket.ticketLines.filter((el) => !payload.includes(el));
        setTicketTotal();
        tickets[selectedIndex] = ticket;
        return {...state, tickets: tickets};
    }

    function setTicketTotal() {
        ticket.totalAmount = ticket.ticketLines.length ?
            ticket.ticketLines
                .map(x => x.amount)
                .reduce((x, y) => x + y) : 0;
    }
};

export default saleTabsReducer;
