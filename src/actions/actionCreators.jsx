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
} from './actionTypes';

// создание экшенов

// экшен поиска
export const loadList = () => {
    return {
        type: LOAD_LIST,
    }
};

// эксшен удачной загрузки списка
export const loadListSuccess = (list) => {
    return {
        type: LOAD_LIST_SUCCESS,
        payload: list,
    }
}

//экшен неудачной загрузки списка
export const loadListFailed = () => {
    console.log('fail');
    return {
        type: LOAD_LIST_FAILED,
    }
}

//экшен загрузки описания
export const loadDescription = (id) => {
    return {
        type: LOAD_DESCRIPTION,
        payload: id,
    }
}
//экшен удачной загрузки описания
export const loadDescriptionSuccess = (data) => {
    return {
        type: LOAD_DESCRIPTION_SUCCESS,
        payload: data,
    }
}

//экшен неудачной загрузки описания
export const loadDescriptionFailed = () => {
    return {
        type: LOAD_DESCRIPTION_FAILED,
    }
}

//экшен отмены редактирования услуги
export const cancel = () => {
    return {
        type: CANCEL,
    }
}

// экшен загрузки отредактированного сервиса
export const uploadService = () => {
    return {
        type: UPLOAD_SERVICE,
    }
}

//экшен удачной загрузки отредкированного сервиса на сервер
export const uploadServiceSuccess = () => {
    return {
        type: UPLOAD_SERVICE_SUCCESS,
    }
}

//экшен неудачной загрузки отредкированного сервиса на сервер
export const uploadServiceFailed = () => {
    return {
        type: UPLOAD_SERVICE_FAILED,
    }
}
