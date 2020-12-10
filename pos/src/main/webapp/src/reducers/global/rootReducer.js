import {combineReducers} from "redux";
import saleTabsReducer from "./saleTabsReducer";
import inventoryMovementReducer from "./inventoryMovementReducer";

const rootReducer = combineReducers({
    tabs: saleTabsReducer,
    inventoryMovement: inventoryMovementReducer
});

export default rootReducer;