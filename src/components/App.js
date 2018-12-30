import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };

    addFish = fish => {
        //takes a COPY of the fishes from state
        const fishes = {...this.state.fishes};

        //add our new fish to fishes with unique key (based on epoch)
        fishes[`fish${Date.now()}`] = fish;

        // put our fishes back in STATE
        this.setState({fishes: fishes});

        console.log(this.state.fishes);
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
                <Order fishes={this.state.fishes} order={this.state.order}/>
                <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes}/>
            </div>
        );
    };
};

export default App;