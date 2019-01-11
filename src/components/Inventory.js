import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm'
import Login from './Login'
import base, {firebaseApp} from '../base'

class Inventory extends React.Component {
    static propTypes = {
        fishes: PropTypes.object,
        deleteFish: PropTypes.func,
        updateFish: PropTypes.func,
        addFish: PropTypes.func,
        loadSampleFishes: PropTypes.func
    };

    state = {
        uid: null,
        owner: null
    }

    componentDidMount() {
        //reach out to firebase to see if the user is logged in
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.authHandler({user});
            }
        });
    };

    authHandler = async(authData) => {
        //look up current store (from url)
        const store = await base.fetch(this.props.storeId, {context:this});
        //if no on eowns it
        if (!store.owner) {
            //THEN set ourselves as the owner
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            })
        }

        //set the user uid from firebase authentication
        //set the owner from the DB or the auth
        this.setState({
            uid:authData.user.uid,
            owner: store.owner || authData.user.uid
        });
    };

    authenticate = (provider) => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.authHandler);
    };

    logout = async () => {
        console.log('logging out');
        await firebase.auth().signOut();
        this.setState({uid: null});
    }

    render() {
        const logout = <button onClick={this.logout}>Log out!</button>
        //check if they are logged in (have user id)
        if (!this.state.uid) {
            return <Login authenticate={this.authenticate}/>;
        }

        //check if they are the owner of the store
        if (this.state.uid !== this.state.owner) {
            return (
                <div>
                Sorry you are not the owner.
                {logout}
                </div>
            )
        }
        return (
            <div className="inventory">
                <h2>Inventory</h2>
                {logout}
                {Object.keys(this.props.fishes).map(key => 
                    <EditFishForm
                        key={key}
                        index={key}
                        fish={this.props.fishes[key]}
                        updateFish={this.props.updateFish}
                        deleteFish={this.props.deleteFish}/>)}
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
            </div>
        );
    };
};

export default Inventory;