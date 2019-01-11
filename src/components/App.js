import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };

    static propTypes = {
        match: PropTypes.object
    };

    //fires when component mounts
    componentDidMount() {
        const {params} = this.props.match;
        const orders = localStorage.getItem(params.storeId);
        if (orders) {
            //orders were saved a sa string so unparse the stringified object
            this.setState({order: JSON.parse(orders)});
        }


        //two params
        //name?
        //object of options, the context and the state you want to sync
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    };

    //fires when component will unmount
    //used here to cleanup connection to firebase
    componentWillUnmount() {
        base.removeBinding(this.ref);
    };

    //fires when a component (view) updates
    //NOT called on initial render
    componentDidUpdate() {
        //takes in a key value pair
        //saves all values as STRINGS (thus stringify)
        localStorage.setItem(this.props.match.params.storeId, 
            JSON.stringify(this.state.order));
    };

    addFish = fish => {
        //takes a COPY of the fishes from state
        const fishes = {...this.state.fishes};

        //add our new fish to fishes with unique key (based on epoch)
        fishes[`fish${Date.now()}`] = fish;

        // put our fishes back in STATE
        this.setState({fishes: fishes});
    };

    loadSampleFishes = () => {
        this.setState({fishes: sampleFishes});
    };

    addToOrder = (key) => {
        const order = {...this.state.order};

        if (order[key]) {
            order[key] = ++order[key];
        } else {
            order[key] = 1;
        }

        this.setState({order: order});
    };

    updateFish = (key, updatedFish) => {
        //takes a COPY of the fishes from state
        const fishes = {...this.state.fishes};
        //update the fish
        fishes[key] = updatedFish
        // put our fishes back in STATE
        this.setState({fishes: fishes});
    };

    deleteFish = (key) => {
        //get copy of fish
        const fishes = {...this.state.fishes};
        //set the fish (key) to null to "delete" it
        //setting to null is neccisary for firebase to delete it
        fishes[key] = null;
        //update the state
        this.setState({fishes: fishes});
    };

    removeOrder = (key) => {
        console.log(key);
        //get copy of order
        const order = {...this.state.order};
        //this is in localStorage so all we need to do is call delete
        delete order[key];
        //update the state
        this.setState({order: order});
    };

    /**
    render can only return one PARENT/ADJACENT element
    if you need to return multiple wrap in in a <React.Fragment> tag
    **/
    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="taglineee"/>
                    <ul>
                        {Object.keys(this.state.fishes).map(key => 
                            <Fish key={key} 
                                details={this.state.fishes[key]}
                                addToOrder={this.addToOrder}
                                index={key}/>
                        )}
                    </ul>
                </div>
            {/*could do everything in state to order with {...this..state}*/}
                <Order 
                    fishes={this.state.fishes}
                    order={this.state.order}
                    removeOrder={this.removeOrder}/>
                <Inventory 
                    addFish={this.addFish} 
                    loadSampleFishes={this.loadSampleFishes}
                    fishes={this.state.fishes}
                    updateFish={this.updateFish}
                    deleteFish={this.deleteFish}
                    storeId={this.props.match.params.storeId}/>
            </div>
        );
    };
};

export default App;