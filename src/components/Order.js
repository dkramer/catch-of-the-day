import React from 'react';
import PropTypes from 'prop-types';
import {formatPrice} from '../helpers';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

class Order extends React.Component {
    static propTypes = {
        fishes: PropTypes.object,
        order: PropTypes.object,
        removeOrder: PropTypes.func
    };

    renderOrder = (key) => {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const isAvailable = fish && fish.status === 'available';
        const transitionOptions = {
            classNames:"count",
            key:key,
            timeout:{enter: 250, exit: 250}
        };
        //if there are no fish then return null so nothing is rendered
        if (!fish) {
            return;
        } else if (isAvailable) {
            return (
                <CSSTransition {...transitionOptions}>
                    <li key={key}>
                        <span>
                            <TransitionGroup component="span" className="count">
                                <CSSTransition classNames="count" key={count} timeout={{enter: 250, exit: 250}}>
                                    <span>{count}</span>
                                 </CSSTransition>
                            </TransitionGroup>
                                lbs of {fish.name} {formatPrice(count * fish.price)}
                                <button onClick={() => this.props.removeOrder(key)}>Remove Fish</button>
                        </span>
                    </li>
                </CSSTransition>
            )
        } else {
            return (
                <CSSTransition {...transitionOptions}>
                    <li key={key}>Sorry {fish ? fish.name : 'fish'} is no longer available</li>
                </CSSTransition>
            )
        }
    };


    render() {
        const orderIds = Object.keys(this.props.order);
        //loops over properties or array
        const total = orderIds.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status === 'available';
            if (isAvailable) {
                return prevTotal + (count * fish.price);
            }
            return prevTotal;
        }, 0);

        return (
            <div className="order-wrap">
                <h2>Order</h2>
                <TransitionGroup component="ul" className="order">
                    {orderIds.map(this.renderOrder)}
                </TransitionGroup>
                <div className="total">
                    Total:
                    <strong>{formatPrice(total)}</strong>
                </div>
            </div>
        );
    };
};

export default Order;