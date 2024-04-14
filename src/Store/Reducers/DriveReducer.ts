import type { IDriveReducerState } from "../../Typings/Store/drive";
import type { Actions } from "../../Typings/Store/store";

const initialState: IDriveReducerState = {
    drives: [],
};

const reducer = (state = initialState, action: Actions): IDriveReducerState => {
    if (action.status !== "SUCCESS") return state;

    switch (action.type) {
        case "FETCH_DRIVES":
            return {
                ...state,
                drives: action.drives,
            };
        default:
            return state;
    }
};

export default reducer;
