import React from 'react';
import PropTypes from 'prop-types';


/**
If a react component only has the render function it is more concise to
to make the component a "stateless functional component"
to do that drop the class <> extends React.Component lines and
make a const variable that has a function that returns the jsx immidiatly
**/
const Header = props => (
    <header className="top">
        Catch
        <span className="ofThe">
            <span className="of"> of </span>
            <span className="the"> the </span>
        </span>
        Day
        <h3 className="tagline">
        {/*to access properties do the below {this.props.<propName>}*/}
        <span>{props.tagline}</span>
    </h3>
    </header>
);

/**
var Header = function(props) {
    return (
        <header className="top">
            Catch
            <span className="ofThe">
                <span className="of">of</span>
                <span className="the">the</span>
            </span>
            Day
            <h3 className="tagline">
            <span>{props.tagline}</span>
        </h3>
        </header>
    );
};



class Header extends React.Component {

    render() {
        return (
            <header className="top">
                Catch
                <span className="ofThe">
                    <span className="of">of</span>
                    <span className="the">the</span>
                </span>
                Day
                <h3 className="tagline">
                <span>{this.props.tagline}</span>
            </h3>
            </header>
        );
    };
};
**/


//with PropTypes module you can specify what paramaters are required
//and even their types
Header.propTypes = {
    tagline: PropTypes.string.isRequired
};

export default Header;