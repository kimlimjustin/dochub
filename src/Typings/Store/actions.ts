import type { Action } from "redux";

export type ActionStatus = "REQUEST" | "SUCCESS" | "FAILURE";
export type AppActionBase<T extends string, S extends ActionStatus> = Action<T> & { status: S };
