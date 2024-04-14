import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

import rootReducer, { IAppState } from "./Reducers";
import rootSaga from "./Sagas";

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger();

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware, loggerMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
