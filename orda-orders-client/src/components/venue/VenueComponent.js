import React, {Component} from "react";
import {observable} from "mobx";
import EmailComponent from "../email/EmailComponent";
import {observer} from "mobx-react";

@observer
export default class VenueComponent extends Component {

    @observable statistics = {
        count: 0,
        total: {
            turnover: 0,
            tips: 0
        }
    };

    @observable selected = false;

    componentWillMount(){

        const {orders} = this.props;
        this.statistics.count = orders.length;

        console.log(orders);

        orders.forEach(({sumTotal, tipSum})=>{

            this.statistics.total.turnover  += sumTotal;
            this.statistics.total.tips      += tipSum;
        });

    }

    prepareEmail = () => {
        this.selected = !this.selected;
    };

    render(){

        const {venueId, venue} = this.props;

        return (<li>
                {this.selected ?
                    <EmailComponent venueId={venueId} venue={venue} statistics={this.statistics}/> :
                    <div>
                        <h3>{venueId} | {venue}</h3>
                        <div>
                            <p>Count: {this.statistics.count}</p>
                            <p>Total Turnover: {this.statistics.total.turnover}</p>
                            <p>Total Tips: {this.statistics.total.tips}</p>
                        </div>
                        <button onClick={this.prepareEmail}>
                            Select
                        </button>
                    </div>
                    }
            </li>)


    }


}