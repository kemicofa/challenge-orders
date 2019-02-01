import ROUTES from "../routes/api-routes";
import {observable, computed} from "mobx";

class OrderStore {

    @observable data = [];

    @computed get orders(){
        return this.data.slice();
    }

    async load(){

        const response = await fetch(ROUTES.GET_ORDERS, {
            method: 'GET'
        });

        const data = await response.json();

        return await this.generateStatistics(data);

    }

    async generateStatistics(data){

        this.data = Array.from(data.reduce((a,{sumTotal, time, tipSum, venueId, venueName})=>{

            //need to take into account that unix timestamp is in seconds and not miliseconds
            const date              = new Date(time*1000);
            const dateString        = date.toDateString();

            //Creating a new map object for venues
            if(!a.has(dateString))  a.set(dateString, new Map());

            //venues for a specific day
            const venues = a.get(dateString);

            console.log(name);

            //add the order of a venue of a specific day
            //if(!venues.has(venueId)) venues.set(venueId, []);
            if(!venues.has(venueId)) venues.set(venueId, {
                venueName, venueId, orders: []
            });

            venues.get(venueId).orders.push({sumTotal, date, tipSum});

            return a;

        }, new Map()));

        return true;

    }
}

const orderStore = new OrderStore();
export default orderStore;
