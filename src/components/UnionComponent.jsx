import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import {Fragment} from 'react';
import ServicesList from './ServicesList';
import StartPage from './StartPage';
import Description from "./Description";

// объединённые компонент для роутов

export default function UnionComponent() {

    return (
        <Fragment>
            <Router>
                <Switch>
                    <Route path="/description" exact component={Description} />
                    <Route path="/services" exact component={ServicesList} />
                    <Route path="/" exact component={StartPage} />  
                </Switch>
                
            </Router>
        </Fragment>
    )
}
