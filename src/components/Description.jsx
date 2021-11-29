import {useSelector, useDispatch} from 'react-redux';
import {Form, Field} from 'react-final-form';
import {useContext} from "react";
import {Link} from 'react-router-dom';
import Context from "../context/Context";
import Spinner from "./Spinner";
import {cancel, uploadService} from "../actions/actionCreators";
import Message from "./Message";
import {Redirect} from "react-router";

export default function Description() {
    const {loading, error, description, save, upload} = useSelector(state => state.list);
    const {getFetch} = useContext(Context);
    const dispatch = useDispatch();

    console.log({loading});
    console.log({error});
    console.log({description});
    console.log({save});
    console.log({upload});

    const onSubmit = (val) => {
        const value = {id: val.id, name: val.Name, price: Number(val.Price), content: val.Content};
        dispatch(uploadService());
        getFetch({method: "POST", dispatch, value});
    }

    const handleCancel = () => dispatch(cancel());

    return (
        <>
            {loading && <Spinner/>}
            {description &&
            <Form onSubmit={onSubmit}
                  initialValues={{...description}}
                  render={({handleSubmit}) => (
                      <form style={{"width": "500px", "margin": "50px"}} onSubmit={handleSubmit}>
                          <div className="mb-3">
                              <label htmlFor="inputName" className="form-label">Название</label>
                              <Field name="Name" component="input" type="text"
                                     className="form-control form-control-lg"
                                     id="inputName" initialValue={description.name} required/>
                          </div>
                          <div className="mb-3">
                              <label htmlFor="inputPrice" className="form-label">Стоимость</label>
                              <Field name="Price" type="text" component="input"
                                     className="form-control form-control-lg"
                                     id="inputPrice" initialValue={description.price} required/>
                          </div>
                          <div className="mb-3">
                              <label htmlFor="inputContent" className="form-label">Описание</label>
                              <Field name="Content" type="text" component="input"
                                     className="form-control form-control-lg" id="inputContent"
                                     initialValue={description.content} required/>
                          </div>
                          {!upload && <div style={{"margin": "5px"}}>Upload changes is failed, please try again.</div>}
                          {!loading && <>
                              <Link to="/services">
                                  <button className="btn btn-dark" onClick={handleCancel}>Cancel</button>
                              </Link>
                              <button type="submit" className="btn btn-dark" style={{"marginLeft": "30px"}}
                              >Submit
                              </button>
                          </>}
                          {loading && <Spinner/>}
                      </form>
                  )}
            />
            }
            {error && <Message variant="description"/>}
            {save && <Redirect to='/'/>}
        </>
    )
}