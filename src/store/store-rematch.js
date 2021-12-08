import {init} from '@rematch/core';
import immerPlugin from '@rematch/immer';

// стор с применением thunk  и библиотеки rematch

const initialState = { // начальное состояние 
    status: 'IDLE',
    list: [],
    description: null,
    id: null,
    save: false,
    upload: true,
};

export const serviceList = {
    state: initialState, // задаём начальное состояние
    reducers: {
        put(state, data) {// редюсер для получения всего списка
            state.list = data;// записываем список в стор
        },
        add(state, action) {// воще ни как не использую
            state.list.push(action);
        },
        setId(state, id) {// редюсер для записи id для текущего сервиса и его редактирования
            state.id = id;// записываем id сервиса в стор
        },
        change(state, data) {//редюсер для изменения сервиса
            state.description = data; // записываем описание сервиса в стор
        },
        setCancel(state) { // редюсер отмены редактирования
            state.description = null;// и все обнуляем, как плешивую моль
            state.id = null;
            state.save = false;
            state.upload = true;
        },
        setStatus(state, action) { // редюсер для установки статуса всего приложения
            state.status = action;
            if (action === "SUCCEEDED") {// обнуляем при успешной загрузки данных
                state.description = null;// это все больше не понадобиться 
                state.id = null;
                state.updated = true;
            } else if (action === "PENDING") {
                state.save = false;
            }
        },
        setUpload(state) { // редюсер для отдельного состояния загрузки измененной информации об услуги на сервер
            state.upload = false;
        },
        setSave(state) { // редюсер для состояния сохранения измененной информации об услуги на сервере
            state.save = true;
        }
    },
    effects: dispatch => ({
        async fetchInitialData(playload, rootState) {// получение списка, playload и rootState нужны тут именно в такой последовательности
            try {
                dispatch.serviceList.setStatus("PENDING"); // состояние загрузки
                const response = await fetch(process.env.REACT_APP_SEARCH_URL);
                const data = await response.json();
                dispatch.serviceList.setStatus("SUCCEEDED");// загрузка успешна
                dispatch.serviceList.put(data);// получили список и отправили на отрисовку 
            } catch (e) {
                console.log(e)
                dispatch.serviceList.setStatus("ERROR")// ошибка сервера 
            }
        },
        async fetchDescriptionData(id) { // получение информации об услуги
            dispatch.serviceList.setId(id);// устанавливаем id услуги, информацию о которой хотим получить
            try {
                dispatch.serviceList.setStatus("PENDING");
                const response = await fetch(`${process.env.REACT_APP_SEARCH_URL}/${id}`);
                const data = await response.json();// удачно
                dispatch.serviceList.setStatus("SUCCEEDED");
                dispatch.serviceList.change(data);
            } catch (e) {
                console.log(e)//неудачно
                dispatch.serviceList.setStatus("ERROR")
            }
        },
        cancel() { // отмена редактирования 
            dispatch.serviceList.setCancel();
            dispatch.serviceList.setStatus("SUCCEEDED");
        },
        async fetchDeleteData(id) { // удаление услуги
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
        async fetchUploadData(value) {// отдельный эффект для загрузки и сохранения измененной информации об услуги на сервере
            try {
                dispatch.serviceList.setStatus("PENDING");
                const response = await fetch(process.env.REACT_APP_SEARCH_URL, {
                    method: 'POST',
                    body: JSON.stringify(value),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (response.ok) {// там совсем другая ошибка, которая так обрабатывается
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