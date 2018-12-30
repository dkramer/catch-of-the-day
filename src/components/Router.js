import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import StorePicker from './StorePicker';
import App from './App';
import NotFound from './NotFound';


const Router = () => (
    <BrowserRouter>
        <Switch>//like a java switch it will execute the first rule it matches and it will break
            //matches url with / (base of app)
            <Route exact path="/" component={StorePicker}></Route>
            //matches url with /store/ANYTHING> then passes on the ANYTHING in the url to the component
            <Route path="/store/:storeId" component={App}></Route>
            //because it does not have a path what ever makes it to this rule will trigger the component
            <Route component={NotFound}></Route>
        </Switch>
    </BrowserRouter>
)

export default Router;