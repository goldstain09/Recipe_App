import { ADD_RECIPE_IN_FIRESTORE_ERROR, ADD_RECIPE_IN_FIRESTORE_START, ADD_RECIPE_IN_FIRESTORE_SUCCESS, CATEGORIES_START, CATEGORIES_SUCCESS, CATEGORY_ERROR, CATEGORY_START, CATEGORY_SUCCESS, DELETE_ERROR, DELETE_START, DELETE_SUCCESS, GET_ALL_RECIPES_FROM_FIRESTORE_ERROR, GET_ALL_RECIPES_FROM_FIRESTORE_START, GET_ALL_RECIPES_FROM_FIRESTORE_SUCCESS, MODAL_ERROR, MODAL_START, MODAL_SUCCESS, SEARCH_ERROR, SEARCH_START, SEARCH_SUCCESS } from "./Recipe.Consonants";

// Initial Value or State
const Init = {
    // all for loadings
    adding_loading:false,
    getting_data_loading:false,
    categoryLoading:false,
    searchLoading:false,
    // its for searching a particular category
    category:'',
    // this is for saving categories , only categories name..!!!
    categories:[], 
    // this is for form of Add yours
    formData:{},
    // error...
    error:'',
    // its for all recipes data ... all !!
    Recipes_Data:[],
    // for searching data or input value
    searchValue:'',

    // this is for delete
    deleteLoading:false
}

const recipeReducer = (state = Init , action) => {
    switch (action.type) {
        case ADD_RECIPE_IN_FIRESTORE_START:
            return{
                ...state,
                adding_loading:true
            }
        case ADD_RECIPE_IN_FIRESTORE_SUCCESS:
            return{
                ...state,
                adding_loading:false,
                formData:action.payload
            }
        case ADD_RECIPE_IN_FIRESTORE_ERROR:
            return{
                ...state,
                adding_loading:false,
                error:action.payload
            }
        

        case GET_ALL_RECIPES_FROM_FIRESTORE_START:
            return{
                ...state,
                getting_data_loading:true,
                error:''
            }
        case GET_ALL_RECIPES_FROM_FIRESTORE_SUCCESS:
            return{
                ...state,
                getting_data_loading:false,
                error:'',
                Recipes_Data:action.payload
            }
        case GET_ALL_RECIPES_FROM_FIRESTORE_ERROR:
            return{
                ...state,
                getting_data_loading:false,
                error:action.payload
            }


        
        case CATEGORY_START:
            return{
                ...state,
                categoryLoading:true
            }
        case CATEGORY_SUCCESS:
            return {
                ...state,
                categoryLoading:false,
                category:action.payload
            }
        case CATEGORY_ERROR:
            return{
                ...state,
                categoryLoading:false,
                error:action.payload
            }


        case CATEGORIES_START:
            return{
                ...state
            }
        case CATEGORIES_SUCCESS:
            return{
                ...state,
                categories:action.payload
            }
        case CATEGORY_ERROR:
            return{
                ...state,
                error:action.payload
            }


        case SEARCH_START:
            return {
                ...state,
                searchLoading:true
            }
        case SEARCH_SUCCESS:
            return{
                ...state,
                searchLoading:false,
                searchValue:action.payload
            }
        case SEARCH_ERROR:
            return{
                ...state,
                searchLoading:false,
                error:action.payload
            }

        

        case DELETE_START:
            return{
                ...state,
                deleteLoading:true
            }
        case DELETE_SUCCESS:
            return{
                ...state,
                deleteLoading:false
            }
        case DELETE_ERROR:
            return{
                ...state,
                deleteLoading:false,
                error:action.payload
            }
    }




    return state;
}

export default recipeReducer;