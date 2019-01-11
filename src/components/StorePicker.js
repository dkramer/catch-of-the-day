//must always improt react for each react components 
//webpack will dedupe so it is only included once in final build
import React from 'react';
import PropTypes from 'prop-types';
import {getFunName} from '../helpers';

/**
All react apps are a collection of COMPONENTS
To create a component syntax is:
    class <className> extends React.Component {...}
**/
class StorePicker extends React.Component { 
    myInput = React.createRef();

    static propTypes = {
        history: PropTypes.object
    };

    /**
    If a method needs to reference 'this' key word
    create a property and set it to an arrow function 
    and the property will be bound to the instance of 'this' object
    **/
    goToStore = event => {
        //stop form submission
        event.preventDefault();
        //get text from input
        const storeName = this.myInput.current.value;
        //change the page to the store inputted
        this.props.history.push(`/store/${storeName}`);
    };

    /**
    render can only return one PARENT/ADJACENT element
    if you need to return multiple wrap in in a <React.Fragment> tag
    **/
    render() {
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                {/*the {} tags tells jsx we want to do JS*/}
                <h2>Please Enter a Store</h2>
                <input 
                    type="text"
                    ref={this.myInput}
                    required
                    placeholder="Store Name"
                    defaultValue={getFunName()} />
                <button type="submit">Visit Store -></button>
            </form>
        );
    }
}

export default StorePicker;