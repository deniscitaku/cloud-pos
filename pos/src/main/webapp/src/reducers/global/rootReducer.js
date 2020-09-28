import {combineReducers} from "redux";
import saleTabsReducer from "./saleTabsReducer";
import inventoryMovementReducer from "./inventoryMovementReducer";
import refReducer from "./refReducer";

const rootReducer = combineReducers({
    tabs: saleTabsReducer,
    inventoryMovement: inventoryMovementReducer,
    refs: refReducer
})

export default rootReducer;