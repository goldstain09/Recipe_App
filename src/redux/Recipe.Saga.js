import { ADD_RECIPE_IN_FIRESTORE_START, CATEGORIES_START, CATEGORY_START, DELETE_START, GET_ALL_RECIPES_FROM_FIRESTORE_START, MODAL_START, SEARCH_START } from "./Recipe.Consonants";
import {delay, put, takeLatest} from 'redux-saga/effects';
import { addRecipeFirestore, deleteRecipeFirestore, getAllRecipesFirestore } from "./Recipe.Services";
import { Modal_Error, Modal_Success, addRecipeFirestoreError, addRecipeFirestoreSuccess, categories_Error, categories_Success, category_Error, category_Success, delete_Error, delete_Success, getAllRecipesFirestoreError, getAllRecipesFirestoreSuccess, search_Error, search_Success } from "./Recipe.Action";


function* addRecipeSaga({payload}){
    try {
        yield delay(2000);
        yield addRecipeFirestore(payload);
        yield put(addRecipeFirestoreSuccess(payload));
    } catch (error) {
        yield delay(3000);
        yield put(addRecipeFirestoreError(error));
    }
}

function* getAllRecipesSaga(){
    try {
        let data = yield getAllRecipesFirestore();
        yield delay(1000);
        yield put(getAllRecipesFirestoreSuccess(data));
    } catch (error) {
        yield delay(3000);
        yield put(getAllRecipesFirestoreError(error));
    }
}

function* categorySaga({payload}){
    try {
        yield delay(2000);
        yield put(category_Success(payload));
    } catch (error) {
        yield delay(3000);
        yield put(category_Error(error))
    }
}

function* categoriesSaga({payload}){
    try {
        yield put(categories_Success(payload));
    } catch (error) {
        yield put(categories_Error(error));
    }
}

function* searchSaga({payload}){
    try {
        yield delay(2000);
        yield put(search_Success(payload));
    } catch (error) {
        yield  delay(1500);
        yield put(search_Error(error));
    }
}

function* deleteSaga({payload}){
    try {
        yield delay(1000);
        yield deleteRecipeFirestore(payload);
        yield put(delete_Success());
    } catch (error) {
        yield delay(2000);
        yield put(delete_Error(error));
    }
}

function* Saga(){
    yield takeLatest(ADD_RECIPE_IN_FIRESTORE_START, addRecipeSaga);
    yield takeLatest(GET_ALL_RECIPES_FROM_FIRESTORE_START,getAllRecipesSaga);
    yield takeLatest(CATEGORY_START, categorySaga);
    yield takeLatest(CATEGORIES_START,categoriesSaga);
    yield takeLatest(SEARCH_START, searchSaga);
    yield takeLatest(DELETE_START,deleteSaga);
}

export default Saga;