import omit from "lodash.omit";

import type { Actions } from "../../Typings/Store/store";
import type { ITab, ITabReducerState } from "../../Typings/Store/tab";

const defaultTab: ITab = {
    name: "Default Tab",
    path: "",
    id: 0,
};

interface INewTabs {
    [name: string]: ITab;
}

const initialState: ITabReducerState = {
    tabs: { [defaultTab.id]: defaultTab },
    activeTab: defaultTab,
};

const reducer = (state = initialState, action: Actions): ITabReducerState => {
    if (action.status !== "SUCCESS") return state;

    switch (action.type) {
        case "CREATE_TAB":
            return {
                ...state,
                tabs: {
                    ...state.tabs,
                    [action.tab.id]: action.tab,
                },
            };
        case "UPDATE_TAB": {
            const newTabs: INewTabs = {};
            Object.entries(state.tabs).forEach(([name, tab]) => {
                if (tab.id === action.tab.id) {
                    newTabs[tab.id] = {
                        ...tab,
                        ...action.tab,
                        name: action.tab.name || tab.name,
                    };
                } else {
                    newTabs[tab.id] = tab;
                }
            });
            return {
                ...state,
                tabs: newTabs,
            };
        }
        case "DELETE_TAB": {
            const newTabsList = omit(state.tabs, action.id);
            return {
                ...state,
                tabs: newTabsList,
                activeTab: state.activeTab.id === action.id ? newTabsList[Object.keys(newTabsList)[0]] : state.activeTab,
            };
        }
        case "SET_ACTIVE_TAB":
            return {
                ...state,
                activeTab: action.tab,
            };
        default:
            return state;
    }
};

export default reducer;
