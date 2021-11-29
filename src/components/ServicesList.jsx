import {Fragment,} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import Spinner from "./Spinner";
import Message from "./Message";
import Actions from "./Actions"


// компонент отображения списка

export default function ServicesList() {
    const {list, loading, error} = useSelector(state => state.list);
    const dispatch = useDispatch();

    return (
        <Fragment>
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
                {!loading ? list.map((item, index) => {
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
            {error && <Message variant="list" />}
        </Fragment>

    )
}