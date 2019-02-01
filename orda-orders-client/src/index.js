import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Provider} from 'mobx-react';
import orderStore from './stores/order.store';
import OrdersComponent from "./components/orders/OrdersComponent";

class App extends Component {

    render(){
        return (
            <Provider orderStore={orderStore}>
                <OrdersComponent/>
            </Provider>
        )
    }

}

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : false;