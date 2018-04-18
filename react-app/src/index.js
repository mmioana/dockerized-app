import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import {createStore} from 'redux';
import getUsers from './reducers';

let store = createStore(getUsers);

let render = () => {
    ReactDOM.render(
        <BrowserRouter>
            <App store={store} />
        </BrowserRouter>,
        document.getElementById('root'));
    registerServiceWorker();
}

store.subscribe(render);

render();