/*import {
    LOAD_LIST,
    LOAD_LIST_SUCCESS,
    LOAD_LIST_FAILED,
    LOAD_DESCRIPTION,
    LOAD_DESCRIPTION_SUCCESS,
    CANCEL,
    UPLOAD_SERVICE,
    UPLOAD_SERVICE_SUCCESS,
    UPLOAD_SERVICE_FAILED,
    LOAD_DESCRIPTION_FAILED,
} from '../actions/actionTypes'

const initialState = {
    list: [],
    loading: false,
    error: null,
    description: null,
    id: null,
    save: null,
    upload: true,
};

export default function listReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_LIST:
            return {
                ...state,
                loading: true,
                error: false,
                save: null,
            };
        case LOAD_LIST_SUCCESS:
            return {
                ...state, loading: false, error: false, list: action.payload,
            }
        case LOAD_LIST_FAILED:
            return {
                ...state, loading: false, error: true,
            }
        case LOAD_DESCRIPTION:
            return {
                ...state, loading: true, error: false, id: action.payload, save: false,
            }
        case LOAD_DESCRIPTION_SUCCESS:
            return {
                ...state, loading: false, error: false, description: action.payload, id: null,
            }
        case LOAD_DESCRIPTION_FAILED:
            return {
                ...state, loading: false, error: true, description: null, id: null,
            }
        case CANCEL:
            return {
                ...state, description: null, loading: false, error: false, upload: true,
            }
        case UPLOAD_SERVICE:
            return {
                ...state, loading: true, error: false,
            }
        case UPLOAD_SERVICE_SUCCESS:
            return {
                ...state, loading: false, error: false, description: null, list: [], save: true, upload: true,
            }
        case UPLOAD_SERVICE_FAILED:
            return {
                ...state, loading: false, error: false, save: false, upload: false,
            }
        default:
            return state;
    }
}
*/