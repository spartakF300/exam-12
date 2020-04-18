import {
    CREATE_PHOTO_SUCCESS,
    FETCH_PHOTO_FAILURE,
    FETCH_PHOTO_REQUEST,
    FETCH_PHOTO_SUCCESS
} from "../actions/actionsGallery";

const initialState = {
   photo:[],
    error:null,
    loading:false
};
const ReducerGallery = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PHOTO_REQUEST:
            return{...state,loading:true};
        case FETCH_PHOTO_SUCCESS:
            return{...state, photo:action.data,loading:false};
        case FETCH_PHOTO_FAILURE:
            return{...state,error:action.error,loading: false};
        case CREATE_PHOTO_SUCCESS:
            return{...state, loading:false};
            default:return  state
    }

};

export default ReducerGallery;