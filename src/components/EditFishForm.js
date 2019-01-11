import React from 'react';
import PropTypes from 'prop-types';

class EditFishForm extends React.Component {
    static propTypes = {
        fish: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            desc: PropTypes.string,
            status: PropTypes.string,
            price: PropTypes.number
        }),
        index: PropTypes.string,
        updateFish: PropTypes.func
    };

    handleChange = (event) => {
        //event.currentTarget.value will get the VALUE of the new input
        //[event.currentTarget.name] will get the NAME of the changed input
        //take copy of current fish
        const updatedFish= {
            ...this.props.fish,
            [event.currentTarget.name]: event.currentTarget.value
        };
        this.props.updateFish(this.props.index, updatedFish);
    };

    render() {
        return (
            <div className="fish-edit">
                <input name="name" onChange={this.handleChange} value={this.props.fish.name} type="text" />
                <input name="price" onChange={this.handleChange} value={this.props.fish.price} type="text" />
                <select name="status" onChange={this.handleChange} value={this.props.fish.status}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea name="desc" onChange={this.handleChange} value={this.props.fish.desc}></textarea>
                <input name="image" onChange={this.handleChange} value={this.props.fish.image} type="text" />
                <button onClick={() => this.props.deleteFish(this.props.index)}>Remove Fish</button>
            </div>
        );
    };
};

export default EditFishForm;