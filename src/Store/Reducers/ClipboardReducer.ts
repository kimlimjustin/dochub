import type { IClipboardReducerState } from "../../Typings/Store/clipboard";
import type { Actions } from "../../Typings/Store/store";

const initialState: IClipboardReducerState = {
    text: "",
};

const reducer = (state = initialState, action: Actions): IClipboardReducerState => {
    if (action.status !== "SUCCESS") return state;

    switch (action.type) {
        case "WRITE_TO_CLIPBOARD":
        case "READ_FROM_CLIPBOARD":
            return {
                ...state,
                text: action.text,
            };
        default:
            return state;
    }
};

export default reducer;
