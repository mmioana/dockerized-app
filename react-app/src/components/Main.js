import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import DataGenerationPage from "./DataGenerationPage";
import AggregationPage from "./AggregationPage";
import Login from "./Login";
import DefaultPage from "./DefaultPage";

const Main = ({store}) => {
    return (<main>
        <Provider store={store}>
            <Switch>
                <Route exact path='/' component={Login}/>
                <Route path='/data-gen' component={DataGenerationPage}/>
                <Route path='/aggreg' component={AggregationPage}/>
                <Route path='/default' component={DefaultPage}/>
            </Switch>
        </Provider>
    </main>);
}

Main.propTypes = {
    store: PropTypes.object.isRequired
}

export default Main;