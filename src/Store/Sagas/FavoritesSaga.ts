import { all, call, takeLatest } from "redux-saga/effects";

import { fetchFavoritesFailure, fetchFavoritesSuccess } from "../ActionCreators/FavoritesActionCreators";

import * as FavoritesService from "../../Services/FavoritesService";
import type { IFavorites } from "../../Typings/Store/favorites";
import { typedPut as put, selectStatus } from "./helpers";

function* fetchFavoritesWorker() {
    try {
        const favorites: IFavorites = yield call(FavoritesService.fetchFavorites);
        yield put(fetchFavoritesSuccess(favorites));
    } catch (error) {
        yield put(fetchFavoritesFailure(error.message));
    }
}

function* favoritesSaga() {
    yield all([takeLatest(selectStatus("FETCH_FAVORITES"), fetchFavoritesWorker)]);
}

export default favoritesSaga;
