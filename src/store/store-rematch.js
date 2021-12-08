import {init} from '@rematch/core';
import immerPlugin from '@rematch/immer';

const initialState = {
    status: 'IDLE',
    list: [],
    description: null,
    id: null,
    save: false,
    upload: true,
};

export const serviceList = {
    state: initialState,
    reducers: {
        put(state, data) {
            state.list = data;
        },
        add(state, action) {
            state.list.push(action);
        },
        setId(state, id) {
            state.id = id;
        },
        change(state, data) {
            state.description = data;
        },
        setCancel(state) {
            state.description = null;
            state.id = null;
            state.save = false;
            state.upload = true;
        },
        setStatus(state, action) {
            state.status = action;
            if (action === "SUCCEEDED") {
                state.description = null;
                state.id = null;
                state.updated = true;
            } else if (action === "PENDING") {
                state.save = false;
            }
        },
        setUpload(state) {
            state.upload = false;
        },
        setSave(state) {
            state.save = true;
        }
    },
    effects: dispatch => ({
        async fetchInitialData(playload, rootState) {
            try {
                dispatch.serviceList.setStatus("PENDING");
                const response = await fetch(process.env.REACT_APP_SEARCH_URL);
                const data = await response.json();
                dispatch.serviceList.setStatus("SUCCEEDED");
                dispatch.serviceList.put(data);
            } catch (e) {
                console.log(e)
                dispatch.serviceList.setStatus("ERROR")
            }
        },
        async fetchDescriptionData(id) {
            dispatch.serviceList.setId(id);
            try {
                dispatch.serviceList.setStatus("PENDING");
                const response = await fetch(`${process.env.REACT_APP_SEARCH_URL}/${id}`);
                const data = await response.json();
                dispatch.serviceList.setStatus("SUCCEEDED");
                dispatch.serviceList.change(data);
            } catch (e) {
                console.log(e)
                dispatch.serviceList.setStatus("ERROR")
            }
        },
        cancel() {
            dispatch.serviceList.setCancel();
            dispatch.serviceList.setStatus("SUCCEEDED");
        },
        async fetchDeleteData(id) {
            try {
                dispatch.serviceList.setStatus("PENDING");
                await fetch(`${process.env.REACT_APP_SEARCH_URL}/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                const response = await fetch(process.env.REACT_APP_SEARCH_URL);
                const data = await response.json();
                dispatch.serviceList.setStatus("SUCCEEDED");
                dispatch.serviceList.put(data);
            } catch (e) {
                console.log(e);
                dispatch.serviceList.setStatus("ERROR");
            }
        },
        async fetchUploadData(value) {
            try {
                dispatch.serviceList.setStatus("PENDING");
                const response = await fetch(process.env.REACT_APP_SEARCH_URL, {
                    method: 'POST',
                    body: JSON.stringify(value),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (response.ok) {
                    dispatch.serviceList.setStatus("SUCCEEDED");
                    dispatch.serviceList.setSave();
                } else {
                    dispatch.serviceList.setStatus("IDLE");
                    dispatch.serviceList.setUpload();
                };

            } catch (e) {
                console.log(e);
                dispatch.serviceList.setStatus("ERROR");
            }
        }

    })
};

const store = init({
    models: {serviceList},
    plugins: [immerPlugin()]
});
export default store;