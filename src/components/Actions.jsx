import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
// компонент для отрисвоки кнопок "Редактировать" и "Удалить"
export default function Actions(props) {
    const {id} = props; // получаем id элемента для уаления или редактирования
    const dispatch = useDispatch();

    return (
        <>
            <div className="btn-group" role="group" aria-label="Basic outlined example">
                <Link to="/description">
                    <button type="button" className="btn btn-outline-dark"
                            onClick={() => {
                                dispatch.serviceList.fetchDescriptionData(id);
                            }}>
                    <span className="material-icons">
                        edit
                    </span>
                    </button>
                </Link>
                <button type="button" className="btn btn-outline-dark"
                        onClick={() => {
                            dispatch.serviceList.fetchDeleteData(id);
                        }}>
                    <span className="material-icons">
                        delete
                    </span>
                </button>
            </div>
        </>
    );
}