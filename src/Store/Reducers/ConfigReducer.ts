import type { IConfigReducerState } from "../../Typings/Store/config";
import type { Actions } from "../../Typings/Store/store";

const initialState: IConfigReducerState = {
    opacity: 0.5,
    fontFamily: "system-ui",
    fontSize: 16,
    theme: "Dark",
    appLang: "English",
    mainBoxTransparency: 1,
    topbarTransparency: 1,
    sidebarTransparency: 0.8,
};

const reducer = (state = initialState, action: Actions): IConfigReducerState => {
    if (action.status !== "SUCCESS") return state;

    switch (action.type) {
        case "UPDATE_CONFIG":
            return {
                ...state,
                ...action.updates,
            };
        default:
            return state;
    }
};

export default reducer;
