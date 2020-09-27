import {combineReducers} from "redux";
import ticketReducer from "./ticketReducer";
import inventoryMovementReducer from "./inventoryMovementReducer";
import refReducer from "./refReducer";

const rootReducer = combineReducers({
    ticket: ticketReducer,
    inventoryMovement: inventoryMovementReducer,
    refs: refReducer
})

export default rootReducer;