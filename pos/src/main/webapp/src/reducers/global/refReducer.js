const ADD_REF = 'ADD_REF';
const REMOVE_REF = 'REMOVE_REF';
const GET_REF = 'GET_REF'

export const addRef = (refName, refObject, dispatch) => {
    console.log("Passed to addRef: ", refName, " AND ", refObject)
    dispatch({
        type: ADD_REF,
        refName: refName,
        refObject: refObject
    })
}

export const removeRef = (refName, dispatch) => {
    dispatch({
        type: REMOVE_REF,
        refName: refName
    })
}

export const getRef = (refName, dispatch) => {
    dispatch({
        type: GET_REF,
        refName: refName
    })
}

const refReducer = (state = new Map(), action) => {
    const {type, refName, refObject} = action;
    const clonedState = new Map(state);

    switch (type) {
        case ADD_REF:
            return clonedState.set(refName, refObject);
        case GET_REF:
            return clonedState.get(refName);
        case REMOVE_REF:
            clonedState.delete(refName);
            return clonedState;
        default:
            return clonedState;
    }
}

export default refReducer;