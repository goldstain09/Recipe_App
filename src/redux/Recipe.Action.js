import { ADD_RECIPE_IN_FIRESTORE_ERROR, ADD_RECIPE_IN_FIRESTORE_START, ADD_RECIPE_IN_FIRESTORE_SUCCESS, CATEGORIES_ERROR, CATEGORIES_START, CATEGORIES_SUCCESS, CATEGORY_ERROR, CATEGORY_START, CATEGORY_SUCCESS, DELETE_ERROR, DELETE_START, DELETE_SUCCESS, GET_ALL_RECIPES_FROM_FIRESTORE_ERROR, GET_ALL_RECIPES_FROM_FIRESTORE_START, GET_ALL_RECIPES_FROM_FIRESTORE_SUCCESS, MODAL_ERROR, MODAL_START, MODAL_SUCCESS, SEARCH_ERROR, SEARCH_START, SEARCH_SUCCESS } from "./Recipe.Consonants";

// FOR GETTING DATA FROM FIRESTORE
export const getAllRecipesFirestoreStart = () => ({
    type:GET_ALL_RECIPES_FROM_FIRESTORE_START
})

export const getAllRecipesFirestoreSuccess = (data) => {
//    console.log(data);
return{ type:GET_ALL_RECIPES_FROM_FIRESTORE_SUCCESS,
    payload:data}
}
export const getAllRecipesFirestoreError = (error) => ({
    type:GET_ALL_RECIPES_FROM_FIRESTORE_ERROR,
    payload:error
})



// FOR ADDING DATA TO FIRESTORE
export const addRecipeFirestoreStart = (data) => ({
    type:ADD_RECIPE_IN_FIRESTORE_START,
    payload: data
})

export const addRecipeFirestoreSuccess = (data) => ({
    type:ADD_RECIPE_IN_FIRESTORE_SUCCESS,
    payload: data
})

export const addRecipeFirestoreError = (error) => ({
    type:ADD_RECIPE_IN_FIRESTORE_ERROR,
    payload:error
})



// FOR SHOWING SINGLE CATEGORY DATA 
export const category_Start = (category) => ({
    type:CATEGORY_START,
    payload:category
});

export const category_Success = (category) => ({
    type:CATEGORY_SUCCESS,
    payload:category
});

export const category_Error = (error) => ({
    type:CATEGORY_ERROR,
    payload:error
})
 


// for saving al categories name in one...
export const categories_Start = (categories) => ({
    type:CATEGORIES_START,
    payload:categories
});

export const categories_Success = (categories) => ({
    type:CATEGORIES_SUCCESS,
    payload:categories
});

export const categories_Error = (error) => ({
    type:CATEGORIES_ERROR,
    payload:error
})
 

// for search 
export const search_Start = (input) => ({
    type:SEARCH_START,
    payload:input
})

export const search_Success = (input) => ({
    type:SEARCH_SUCCESS,
    payload:input
})

export const search_Error = (error) => ({
    type:SEARCH_ERROR,
    payload:error
})



// for search 
export const delete_Start = (input) => ({
    type:DELETE_START,
    payload:input
})

export const delete_Success = (input) => ({
    type:DELETE_SUCCESS,
    payload:input
})

export const delete_Error = (error) => ({
    type:DELETE_ERROR,
    payload:error
})


