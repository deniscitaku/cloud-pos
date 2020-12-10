import {InventoryMovementPayload, MovementKind} from "../../client/Client";

const inventoryMovementSuffix = "_INVENTORY_MOVEMENT";
const inventoryMovementLineSuffix = "_INVENTORY_MOVEMENT_LINE";

const SET_SUPPLIER_TO_INVENTORY_MOVEMENT = `SET_SUPPLIER_TO${inventoryMovementSuffix}`;
const SET_INVENTORY_MOVEMENT = `SET${inventoryMovementSuffix}`;
const RESET_INVENTORY_MOVEMENT = `RESET${inventoryMovementSuffix}`;
const CREATE_INVENTORY_MOVEMENT_LINE = `CREATE${inventoryMovementLineSuffix}`;
const UPDATE_INVENTORY_MOVEMENT_LINE = `UPDATE${inventoryMovementLineSuffix}`;
const DELETE_INVENTORY_MOVEMENT_LINE = `DELETE${inventoryMovementLineSuffix}`;

export const setSupplierToInventoryMovement = (movementKind, supplier, dispatch) => {
    dispatch({
        type: SET_SUPPLIER_TO_INVENTORY_MOVEMENT,
        payload: supplier,
        movementKind: movementKind
    });
};

export const setInventoryMovement = (inventoryMovement, dispatch) => {
    dispatch({
        type: SET_INVENTORY_MOVEMENT,
        payload: inventoryMovement,
        movementKind: inventoryMovement.kind
    })
};

export const addInventoryMovementLine = (movementKind, inventoryMovementLine, dispatch) => {
    dispatch({
        type: CREATE_INVENTORY_MOVEMENT_LINE,
        payload: inventoryMovementLine,
        movementKind: movementKind
    })
};

export const updateInventoryMovementLine = (movementKind, inventoryMovementLine, dispatch) => {
    dispatch({
        type: UPDATE_INVENTORY_MOVEMENT_LINE,
        payload: inventoryMovementLine,
        movementKind: movementKind
    })
};

export const deleteInventoryMovementLines = (movementKind, inventoryMovementLines, dispatch) => {
    dispatch({
        type: DELETE_INVENTORY_MOVEMENT_LINE,
        payload: inventoryMovementLines,
        movementKind: movementKind
    })
};

export const resetInventoryMovement = (movementKind, dispatch) => {
    dispatch({
        type: RESET_INVENTORY_MOVEMENT,
        movementKind: movementKind
    })
};

const initialState = new Map();
Object.keys(MovementKind).forEach(kind => {
    initialState.set(kind, new InventoryMovementPayload({kind: kind, inventoryMovementLines: []}))
});

const inventoryMovementReducer = (state = initialState, action) => {
    const {type, payload, movementKind} = action;
    const clonedState = new Map(state);
    const inventoryMovement = {...clonedState.get(movementKind)};

    switch (type) {
        case SET_SUPPLIER_TO_INVENTORY_MOVEMENT:
            return setSupplierToInventoryMovement();
        case SET_INVENTORY_MOVEMENT:
            return setInventoryMovement();
        case CREATE_INVENTORY_MOVEMENT_LINE:
            return createInventoryMovementLine();
        case UPDATE_INVENTORY_MOVEMENT_LINE:
            return updateInventoryMovementLine();
        case DELETE_INVENTORY_MOVEMENT_LINE:
            return deleteInventoryMovementLines();
        case RESET_INVENTORY_MOVEMENT:
            return resetInventoryMovement();
        default:
            return state;
    }

    function setSupplierToInventoryMovement() {
        inventoryMovement.supplier = payload;
        return clonedState.set(movementKind, inventoryMovement);
    }

    function setInventoryMovement() {
        return clonedState.set(movementKind, payload);
    }

    function createInventoryMovementLine() {
        if (!inventoryMovement.inventoryMovementLines) {
            inventoryMovement.inventoryMovementLines = [];
        }
        inventoryMovement.inventoryMovementLines =  [...inventoryMovement.inventoryMovementLines, {...payload, lineNumber: inventoryMovement.inventoryMovementLines.length + 1}];
        return clonedState.set(movementKind, inventoryMovement);
    }

    function updateInventoryMovementLine() {
        inventoryMovement.inventoryMovementLines = inventoryMovement.inventoryMovementLines
            .map(x => x.lineNumber === payload.lineNumber ? payload : x);
        return clonedState.set(movementKind, inventoryMovement)
    }

    function deleteInventoryMovementLines() {
        inventoryMovement.inventoryMovementLines = inventoryMovement.inventoryMovementLines
            .filter((el) => !payload.includes(el));
        return clonedState.set(movementKind, inventoryMovement);
    }

    function resetInventoryMovement() {
        return clonedState.set(movementKind, new InventoryMovementPayload({kind: movementKind, inventoryMovementLines: []}));
    }
};

export default inventoryMovementReducer;