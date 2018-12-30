//imports the entire react package
import React from 'react'; //note 'react' is lower case
//with {} notation it imports only the METHODS we tell it to from the PACKAGE
import { render } from 'react-dom'; //import only render method from react-dom package
//import StorePicker from './components/StorePicker'; //imports via relative path, can leave off .js
//import App from './components/App';
import Router from './components/Router';
import './css/style.css';


/**
        render method has two params
        the HTML to render
        and the element to add the HTML too
    **/
//render(<StorePicker/>, document.querySelector('#main'));
render(<Router />, document.querySelector('#main'));