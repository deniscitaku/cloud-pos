export const Actions = {
    GOTO_TAB: 'GOTO_TAB',
    NEXT_TAB: 'NEXT_TAB',
    PREV_TAB: 'PREV_TAB',
    NEW_TAB: 'NEW_TAB',
    REMOVE_TAB: 'REMOVE_TAB',
    UPDATE_TAB: 'REMOVE_TAB'
}

export default function tabReducer(state, action) {


    switch (action.type) {
        case Actions.GOTO_TAB :
        {
            return {...state, selectedIndex: action.selectedIndex}
        }
        case Actions.NEXT_TAB :
        {
            return {...state, selectedIndex: (state.selectedIndex + 1) % state.tabs.length}
        }
        case Actions.PREV_TAB :
        {
            return {...state, selectedIndex: (state.selectedIndex - 1 + state.tabs.length) % state.tabs.length}
        }
        case Actions.NEW_TAB :
        {
            let tabs = Array.isArray(state.tabs) ? state.tabs : [];
            if (tabs.length === 10) {
                return state;
            }
            return newTab(tabs);
        }
        case Actions.REMOVE_TAB :
        {
            let tabs = Array.isArray(state.tabs) ? state.tabs : [];
            tabs.splice(state.selectedIndex, 1);
            if (tabs.length === 0) {
                return newTab(tabs);
            }
            return {...state, selectedIndex: (state.selectedIndex - 1 + state.tabs.length) % state.tabs.length }
        }
        case Actions.UPDATE_TAB :
        {
            let tabs = Array.isArray(state.tabs) ? state.tabs : [];
            tabs[state.selectedIndex].ticket = action.ticket;
            return {...state, tabs: tabs};
        }
        default :
            return state;
    }

    function newTab(tabs) {
        tabs = [...tabs, {ticket: action.ticket }];
        return {...state, tabs, selectedIndex: tabs.length - 1};
    }
}