import {TicketLinePayload} from "../../client/Client";

const ticketSuffix = "_TICKET";
const ticketLineSuffix = "_TICKET_LINE";

const OPEN_TICKET = `OPEN${ticketSuffix}`;
const CLOSE_TICKET = `CLOSE${ticketSuffix}`;
const CREATE_TICKET_LINE_FROM_PRODUCT = `CREATE${ticketLineSuffix}_FROM_PRODUCT`;
const CREATE_TICKET_LINE = `CREATE${ticketLineSuffix}`;
const UPDATE_TICKET_LINE = `UPDATE${ticketLineSuffix}`;
const DELETE_TICKET_LINE = `DELETE${ticketLineSuffix}`;

export const openTicket = (ticketIndex, ticket, dispatch) => {
    dispatch({
        type: OPEN_TICKET,
        payload: ticket,
        ticketIndex: ticketIndex
    })
}

export const closeTicket = (ticketIndex, dispatch) => {
    dispatch({
        type: CLOSE_TICKET,
        ticketIndex: ticketIndex
    })
}

export const addTicketLineFromProduct = (ticketIndex, product, dispatch) => {
    dispatch({
        type: CREATE_TICKET_LINE_FROM_PRODUCT,
        payload: product,
        ticketIndex: ticketIndex
    })
}

export const addTicketLine = (ticketIndex, ticketLine, dispatch) => {
    dispatch({
        type: CREATE_TICKET_LINE,
        payload: ticketLine,
        ticketIndex: ticketIndex
    })
}

export const updateTicketLine = (ticketIndex, ticketLine, dispatch) => {
    dispatch({
        type: UPDATE_TICKET_LINE,
        payload: ticketLine,
        ticketIndex: ticketIndex
    })
}

export const deleteTicketLines = (ticketIndex, ticketLine, dispatch) => {
    dispatch({
        type: DELETE_TICKET_LINE,
        payload: ticketLine,
        ticketIndex: ticketIndex
    })
}

const initialState = [];
const ticketReducer = (state = initialState, action) => {
    const {type, payload, ticketIndex} = action;
    const clonedState = [...state];
    const ticket = clonedState[ticketIndex];

    switch (type) {
        case CREATE_TICKET_LINE_FROM_PRODUCT:
            return createTicketLineFromProduct();
        case CREATE_TICKET_LINE:
            return createTicketLine();
        case UPDATE_TICKET_LINE:
            return updateTicketLine();
        case DELETE_TICKET_LINE:
            return deleteTicketLines();
        case OPEN_TICKET:
            state.push(payload);
            return state;
        case CLOSE_TICKET:
            state.splice(ticketIndex, 1);
            return state;
        default:
            return state;
    }

    function createTicketLine() {
        ticket.ticketLines = [...ticket.ticketLines, payload];
        setTicketTotal()
        clonedState[ticketIndex] = ticket;
        return clonedState;
    }

    function createTicketLineFromProduct() {
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
        clonedState[ticketIndex] = ticket;
        return clonedState;
    }

    function updateTicketLine() {
        payload.amount = payload.quantity * payload.product.priceTax;
        ticket.ticketLines = ticket.ticketLines
            .map(x => x.lineNumber === payload.lineNumber ? payload : x);
        setTicketTotal();
        clonedState[ticketIndex] = ticket
        return clonedState;
    }

    function deleteTicketLines() {
        ticket.ticketLines = ticket.ticketLines.filter((el) => !payload.includes(el));
        setTicketTotal();
        clonedState[ticketIndex] = ticket;
        return clonedState;
    }

    function setTicketTotal() {
        ticket.totalAmount = ticket.ticketLines.length ?
            ticket.ticketLines
                .map(x => x.amount)
                .reduce((x, y) => x + y) : 0;
    }
};

export default ticketReducer;
