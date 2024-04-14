import type { CreateTabSuccess, DeleteTabSuccess, ITab, SetActiveTabSuccess, UpdateTabSuccess } from "../../Typings/Store/tab";

export const createTab = (tab: ITab): CreateTabSuccess => ({
    type: "CREATE_TAB",
    status: "SUCCESS",
    tab,
});

export const updateTab = (name: string, tab: Partial<ITab>): UpdateTabSuccess => ({
    type: "UPDATE_TAB",
    status: "SUCCESS",
    name,
    tab,
});

export const deleteTab = (id: number): DeleteTabSuccess => ({
    type: "DELETE_TAB",
    status: "SUCCESS",
    id,
});

export const setActiveTab = (tab: ITab, pushToHistory = true): SetActiveTabSuccess => ({
    type: "SET_ACTIVE_TAB",
    status: "SUCCESS",
    tab,
    pushToHistory,
});
