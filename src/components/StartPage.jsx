import {Redirect} from 'react-router';
import {useEffect} from "react";
import {useDispatch} from "react-redux";
// компонент для отрисовки стартовой страницы
// сразу происхоодит редирект на страницу со списком услуг
export default function StartPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch.serviceList.fetchInitialData();
    })

    return (
        <Redirect to='/services'/>
    )
}
