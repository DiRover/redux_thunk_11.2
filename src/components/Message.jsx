import {useDispatch, useSelector} from 'react-redux';
// компонент для отрисовки модалки с ошибкой со стороны сервера 
export default function Message(prop) {
    const {id} = useSelector(state => state.serviceList);
    const dispatch = useDispatch();

    const {variant} = prop; //вариант того, что не получилось загрузить

    const handleRequest = () => {
        switch (variant) {
            case 'list': //если не получилось загрузить список услуг
                dispatch.serviceList.fetchInitialData(id);
                break;
            case 'description': // если не получилось загрузить информацию об услуге 
                dispatch.serviceList.fetchDescriptionData(id);
                break;
            default: // дефолтное значение 
                break;
        }
    }
    return (
        <div className="card" style={{"margin": "30px", "width": "500px"}}>
            <div className="card-header">
                Fail!
            </div>
            <div className="card-body">
                <h5 className="card-title">Server doesn't response</h5>
                <p className="card-text">For new try, please push the button</p>
                <button type="button" className="btn btn-dark" onClick={handleRequest}>Reload</button>
            </div>
        </div>
    )
}