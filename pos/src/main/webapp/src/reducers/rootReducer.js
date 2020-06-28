import {combineReducers} from "redux";
import ticketReducer from "./ticketReducer";

const rootReducer = combineReducers({
    ticket: ticketReducer,
})

export default rootReducer;