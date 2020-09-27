import {InventoryMovementPayload, MovementKind} from "../../client/Client";

const inventoryMovementSuffix = "_INVENTORY_MOVEMENT";
const inventoryMovementLineSuffix = "_INVENTORY_MOVEMENT_LINE";

const RESET_INVENTORY_MOVEMENT = `RESET${inventoryMovementSuffix}`;
const CREATE_INVENTORY_MOVEMENT_LINE = `CREATE${inventoryMovementLineSuffix}`;
const UPDATE_INVENTORY_MOVEMENT_LINE = `UPDATE${inventoryMovementLineSuffix}`;
const DELETE_INVENTORY_MOVEMENT_LINE = `DELETE${inventoryMovementLineSuffix}`;

export const addInventoryMovementLine = (movementKind, inventoryMovementLine, dispatch) => {
    dispatch({
        type: CREATE_INVENTORY_MOVEMENT_LINE,
        inventoryMovementLine: inventoryMovementLine,
        movementKind: movementKind
    })
}

export const updateInventoryMovementLine = (movementKind, inventoryMovementLine, dispatch) => {
    dispatch({
        type: UPDATE_INVENTORY_MOVEMENT_LINE,
        inventoryMovementLine: inventoryMovementLine,
        movementKind: movementKind
    })
}

export const deleteInventoryMovementLines = (movementKind, inventoryMovementLines, dispatch) => {
    dispatch({
        type: DELETE_INVENTORY_MOVEMENT_LINE,
        inventoryMovementLine: inventoryMovementLines,
        movementKind: movementKind
    })
}

export const resetInventoryMovement = (movementKind, dispatch) => {
    dispatch({
        type: RESET_INVENTORY_MOVEMENT,
        movementKind: movementKind
    })
}

const initialState = new Map();
Object.keys(MovementKind).map(kind => {
    initialState.set(kind, new InventoryMovementPayload({kind: kind, inventoryMovementLines: []}))
})

const inventoryMovementReducer = (state = initialState, action) => {
    const {type, inventoryMovementLine, movementKind} = action;
    const clonedState = new Map(state);
    const inventoryMovement = clonedState.get(movementKind);

    switch (type) {
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

    function createInventoryMovementLine() {
        inventoryMovement.inventoryMovementLines = [...inventoryMovement.inventoryMovementLines, inventoryMovementLine];
        return clonedState.set(movementKind, inventoryMovement);
    }

    function updateInventoryMovementLine() {
        inventoryMovement.inventoryMovementLines = inventoryMovement.inventoryMovementLines
            .map(x => x.lineNumber === inventoryMovementLine.lineNumber ? inventoryMovementLine : x);
        return clonedState.set(movementKind, inventoryMovement)
    }

    function deleteInventoryMovementLines() {
        inventoryMovement.inventoryMovementLines = inventoryMovement.inventoryMovementLines
            .filter((el) => !inventoryMovementLine.includes(el));
        return clonedState.set(movementKind, inventoryMovement);
    }

    function resetInventoryMovement() {
        return clonedState.set(movementKind, new InventoryMovementPayload({kind: movementKind, inventoryMovementLines: []}));
    }
};

export default inventoryMovementReducer;