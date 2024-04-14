import type { AppActionBase } from "./actions";

export interface ISelectionReducerState {
    selected: string[];
}

export const UPDATE_SELECTION = "UPDATE_SELECTION"; // * Internal

export type UpdateSelectionSuccess = AppActionBase<typeof UPDATE_SELECTION, "SUCCESS"> & { updates: Partial<ISelectionReducerState> };

export type SelectionActions = UpdateSelectionSuccess;
export type SelectionActionTypes = typeof UPDATE_SELECTION;
