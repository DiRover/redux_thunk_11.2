import {useDispatch, useSelector} from 'react-redux';

export default function Message(prop) {
    const {id} = useSelector(state => state.serviceList);
    const dispatch = useDispatch();

    const {variant} = prop;

    const handleRequest = () => {
        switch (variant) {
            case 'list':
                dispatch.serviceList.fetchInitialData(id);
                break;
            case 'description':
                dispatch.serviceList.fetchDescriptionData(id);
                break;
            default:
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