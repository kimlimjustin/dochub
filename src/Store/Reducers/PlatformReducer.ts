import type { IPlatformReducerState } from "../../Typings/Store/platform";
import type { Actions } from "../../Typings/Store/store";

const initialState: IPlatformReducerState = {
    os: null,
};

const reducer = (state = initialState, action: Actions): IPlatformReducerState => {
    if (action.status !== "SUCCESS") return state;

    switch (action.type) {
        case "GET_OS":
            return {
                ...state,
                os: action.os,
            };
        default:
            return state;
    }
};

export default reducer;
