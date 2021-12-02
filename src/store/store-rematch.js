import { init } from '@rematch/core';
import immerPlugin from '@rematch/immer';

import {
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
    status: 'IDLE',
    list: [],
    loading: false,
    error: null,
    description: null,
    id: null,
    save: null,
    upload: true,
};

export const serviceList = {
    state: initialState,
    reducers: {
        put(state, action) {
            state.list = action.payload;
        },
        add(state, action) {
            state.list.push(action);
        },
        remove(state, action) {
            const id = action.payload;
            state.list.splice(id, 1);
        },
        setStatus(state, action) {
            state.status = action.payload;
        }
    },
    effects: dispatch => ({
        async fetchInitialData(payload, rootState) {
            try {
                console.log('1')
                dispatch.serviceList.setStatus("PENDING");
                const response = await fetch(process.env.REACT_APP_SEARCH_URL);
                const data = await response.json();
                console.log(data);
                rootState.serviceList = initialState;
                dispatch.serviceList.setStatus("SUCCEEDED")
            } catch (e) {
                console.log(e)
                dispatch.serviceList.setStatus("ERROR")
            }
        }


    })
};

const store = init({
    models: { serviceList },
    plugins: [immerPlugin()]
});
export default store;