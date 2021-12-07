import {Fragment,} from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import Spinner from "./Spinner";
import Message from "./Message";
import Actions from "./Actions"


// компонент отображения списка

export default function ServicesList() {
    const {list, status, loading, error} = useSelector(state => state.serviceList);
    const dispatch = useDispatch();

    console.log(loading);

    return (
        <Fragment>
            <Link to="/">Reload</Link>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Service</th>
                    <th scope="col">Price</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {status === "SUCCEEDED" ? list.map((item, index) => {
                    return (
                        <tr key={item.id} >
                            <th scope="row">{index + 1}</th>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td><Actions id={item.id} dispatch={dispatch}/></td>
                        </tr>
                    );
                }) : <Spinner />}`
                </tbody>
            </table>
            {status === "ERROR" && <Message variant="list" />}
        </Fragment>

    )
}
