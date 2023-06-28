import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import Saga from "./Recipe.Saga";
import recipeReducer from "./Recipe.Reducer";

const sagaMiddleware = createSagaMiddleware();


const store = configureStore({
    reducer:recipeReducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
    devTools:true
})

sagaMiddleware.run(Saga);

export default store;