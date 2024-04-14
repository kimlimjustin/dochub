import type { IRequestReducerState } from "../../Typings/Store/request";
import type { Actions } from "../../Typings/Store/store";

const initialState: IRequestReducerState = {};

const reducer = (state = initialState, action: Actions): IRequestReducerState => {
    return {
        ...state,
        [action.type]: {
            status: action.status,
            requestTime: action.status === "REQUEST" ? new Date().toLocaleString() : state[action.type]?.requestTime ?? null,
            completedTime:
                action.status === "SUCCESS" || action.status === "FAILURE" ? new Date().toLocaleString() : state[action.type]?.completedTime ?? null,
        },
    };
};

export default reducer;
