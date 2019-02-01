import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import VenueComponent from "../venue/VenueComponent";



const List = ({orders}) => {

    return (
        <div>
            {
                orders.map(([k, venues])=>{
                    return (
                        <div>
                            <h3>{k}</h3>
                            <ul>
                                {
                                    Array.from(venues)
                                        .map(([venueId, {venueName:{venue}, orders}]) => {
                                            return <VenueComponent
                                                key={`${k}-${venueId}`}
                                                venueId={venueId}
                                                venue={venue}
                                                orders={orders}/>
                                        })
                                }
                            </ul>
                        </div>
                    );
                })
            }
        </div>
    )
};

@inject("orderStore") @observer
export default class OrdersComponent extends Component {

    componentDidMount(){

        const {orderStore} = this.props;

        orderStore
            .load()
            .then(loaded=>console.log(`Orders loaded: ${loaded ? "YES" : "NO"}`))
            .catch(err=>console.log(err));
    }

    render(){

        const {orderStore} = this.props;
        return (
            <List orders={orderStore.orders}/>
        )
    }

}