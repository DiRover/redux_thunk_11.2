import Context from '../context/Context';
import {useContext} from "react";
import {Link} from 'react-router-dom';
import {loadDescription} from "../actions/actionCreators";

export default function Actions(props) {
    const {id, dispatch} = props;
    const {getFetch} = useContext(Context);

    return (
        <>
            <div className="btn-group" role="group" aria-label="Basic outlined example">
                <Link to="/description">
                    <button type="button" className="btn btn-outline-dark"
                            onClick={() => {
                                getFetch({method: "GET", dispatch, id});
                                dispatch(loadDescription(id));
                            }}>
                    <span className="material-icons">
                        edit
                    </span>
                    </button>
                </Link>
                <button type="button" className="btn btn-outline-dark"
                        onClick={() => getFetch({method: "DELETE", dispatch, id})}>
                    <span className="material-icons">
                        delete
                    </span>
                </button>
            </div>
        </>
    );
}