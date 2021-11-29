import Context from "./Context";
import {loadListFailed, loadListSuccess, loadDescriptionSuccess, uploadServiceSuccess, uploadServiceFailed} from "../actions/actionCreators";
// http://unionserver.herokuapp.com/ra11/api/services
export default function Provider(prop) {
    const getFetch = async ({method, dispatch, id, value}) => {
        try {

            if (method === "GET" && !id) {//получаем список первоначально
                const response = await fetch(process.env.REACT_APP_SEARCH_URL);
                const data = await response.json();
                response.ok ? dispatch(loadListSuccess(data)) : dispatch(loadListFailed());
                
            } else if (method === "DELETE") {//удаляем элемент списка
                await fetch(`${process.env.REACT_APP_SEARCH_URL}/${id}`, {
                    method,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });//сразу получаем новый список
                const response = await fetch(process.env.REACT_APP_SEARCH_URL, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                const data = await response.json();
                dispatch(loadListSuccess(data));
            } else if (method === "GET" && id) {//получение описание сервиса для редактирования
                const response = await fetch(`${process.env.REACT_APP_SEARCH_URL}/${id}`);
                const data = await response.json();
                response.ok ? dispatch(loadDescriptionSuccess(data)) : dispatch(loadListFailed());

            } else if (method === "POST") {// отправляем отредактированный сервис
                const response = await fetch(process.env.REACT_APP_SEARCH_URL, {
                    method: "POST",
                    body: JSON.stringify(value),
                    headers: {
                        'Content-Type': 'application/json',
                    }

                })
                response.ok ? dispatch(uploadServiceSuccess()) : dispatch(uploadServiceFailed());
            }

        } catch (e) {
            console.log(e)
            
        }
    }

    return (
        <Context.Provider value={{getFetch}}>
            {prop.children}
        </Context.Provider>
    )
}

