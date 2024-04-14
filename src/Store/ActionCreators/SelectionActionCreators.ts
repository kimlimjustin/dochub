import type { ISelectionReducerState, UpdateSelectionSuccess } from "../../Typings/Store/selection";

export const updateSelection = (updates: Partial<ISelectionReducerState>): UpdateSelectionSuccess => ({
    type: "UPDATE_SELECTION",
    status: "SUCCESS",
    updates,
});
