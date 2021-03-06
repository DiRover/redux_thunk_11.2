import {useSelector, useDispatch} from 'react-redux';
import {Form, Field} from 'react-final-form';
import {Link} from 'react-router-dom';
import Spinner from "./Spinner";
import Message from "./Message";
import {Redirect} from "react-router";
// компонент для отрисовки страницы с редактирование информации об услуге
export default function Description() {
    const {description, status, save, upload} = useSelector(state => state.serviceList); // получаем данные для редактироваия 
    const dispatch = useDispatch();

    const onSubmit = (val) => {// после редактирования отправляем измененную услугу на сервер
        const value = {id: val.id, name: val.Name, price: Number(val.Price), content: val.Content}; // получаем данные из формы редактирования
        dispatch.serviceList.fetchUploadData(value); //отправляем
    }

    const handleCancel = () => dispatch.serviceList.cancel(); //обработка отмены редактирования 

    // много сложной логики для отображения спинеров, информации об услуги и кнопок,
    // а также дополнительного сообщения, если загрузка изменненой информации об услуги не была отправлена на сервер
    // модалка с ошибкой со стороны сервера также тут отображается

    return (
        <>
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
                          {!upload &&
                          <div style={{"margin": "5px"}}>Upload changes is failed, please try again.</div>}
                          <>
                              {status === "PENDING" ? <Spinner /> :
                                  <><Link to="/services">
                                      <button className="btn btn-dark" onClick={handleCancel}>Cancel</button>
                                  </Link>
                                      <button type="submit" className="btn btn-dark" style={{"marginLeft": "30px"}}>
                                          Submit
                                      </button>
                                  </>}
                          </>
                      </form>
                  )}
            />
            }
            {(status === "PENDING" && description === null) && <Spinner />}
            {status === "ERROR" && <Message variant="description"/>}
            {save && <Redirect to='/'/>}
        </>
    )
}
