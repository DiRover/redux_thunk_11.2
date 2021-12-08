import {Redirect} from 'react-router';
import {useEffect} from "react";
import {useDispatch} from "react-redux";

export default function StartPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch.serviceList.fetchInitialData();
    })

    return (
        <Redirect to='/services'/>
    )
}
