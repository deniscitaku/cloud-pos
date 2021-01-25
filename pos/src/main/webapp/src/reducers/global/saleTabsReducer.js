const initialState = {
    selectedIndex: 0,
    tickets: []
};

export const Actions = {
    GOTO_TICKET: 'GOTO_TICKET',
    NEXT_TICKET: 'NEXT_TICKET',
    PREV_TICKET: 'PREV_TICKET',
    CREATE_TICKET: 'CREATE_TICKET',
    UPDATE_SELECTED_TICKET: 'SET_TICKET',
    REMOVE_SELECTED_TICKET: 'REMOVE_TICKET',
    CREATE_TICKET_LINE: 'CREATE_TICKET_LINE',
    UPDATE_TICKET_LINE: 'UPDATE_TICKET_LINE',
    REMOVE_TICKET_LINE: 'REMOVE_TICKET_LINE'
};

const saleTabsReducer = (state = initialState, action) => {
    const {type, payload} = action;
    const {selectedIndex, tickets} = state;
    const ticket = {...tickets[selectedIndex]};

    switch (type) {
        case Actions.CREATE_TICKET_LINE:
            return createTicketLine();
        case Actions.UPDATE_TICKET_LINE:
            return updateTicketLine();
        case Actions.REMOVE_TICKET_LINE:
            return removeTicketLines();
        case Actions.CREATE_TICKET:
            return createTicket();
        case Actions.UPDATE_SELECTED_TICKET:
            tickets[selectedIndex] = payload;
            return {...state, tickets: [...tickets]};
        case Actions.REMOVE_SELECTED_TICKET:
            return removeSelectedTicket();
        case Actions.GOTO_TICKET:
            return {...state, selectedIndex: payload};
        case Actions.NEXT_TICKET :
            return {...state, selectedIndex: (selectedIndex + 1) % tickets.length};
        case Actions.PREV_TICKET :
            return {...state, selectedIndex: (selectedIndex - 1 + tickets.length) % tickets.length};
        default:
            return {...state};
    }

    function removeSelectedTicket() {
        if (selectedIndex === 0) {
            tickets.splice(selectedIndex, 1);
            return {...state, tickets: tickets};
        }
        tickets.splice(selectedIndex, 1);

        return {selectedIndex: selectedIndex - 1, tickets: tickets};
    }

    function createTicket() {
        return {selectedIndex: tickets.length, tickets: [...state.tickets, payload]};
    }

    function createTicketLine() {
        ticket.ticketLines = [...ticket.ticketLines, payload];
        tickets[selectedIndex] = ticket;

        return {...state, tickets: tickets};
    }

    function updateTicketLine() {
        ticket.ticketLines = ticket.ticketLines.map(x => x.lineNumber === payload.lineNumber ? payload : x);
        tickets[selectedIndex] = ticket;

        return {...state, tickets: tickets};
    }

    function removeTicketLines() {
        ticket.ticketLines = ticket.ticketLines.filter((el) => !payload.includes(el));
        tickets[selectedIndex] = ticket;

        return {...state, tickets: tickets};
    }
};

export default saleTabsReducer;
