import { put, select } from "@redux-saga/core/effects";
import type { ActionStatus } from "../../Typings/Store/actions";
import type { ActionTypes, Actions } from "../../Typings/Store/store";
import type { IAppState } from "../Reducers";

export const selectStatus =
    (type: ActionTypes, status: ActionStatus = "REQUEST") =>
    (action: Actions) =>
        action.type === type && action.status === status;

export const typedPut = (action: Actions) => put(action);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const typedSelect = (selector: (state: IAppState) => any) => select(selector);
