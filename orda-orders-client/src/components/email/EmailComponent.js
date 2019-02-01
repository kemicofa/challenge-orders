import React, {Component} from 'react';
import ROUTES from "../../routes/api-routes";
import {observable} from 'mobx'
export default class EmailComponent extends Component {

    @observable email = "";
    @observable message = "";

    handleSubmit = async (event) => {
        event.preventDefault();
        const {venueId, venue, statistics} = this.props;

        const response = await fetch(ROUTES.POST_EMAIL, {
            method: 'POST',
            body: JSON.stringify({email: this.email, message: this.message, statistics, venueId, venue})
        });

        console.log(response);

    };

    render() {

        const {venueId, venue} = this.props;

        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Venue Name:
                    <input type="text" value={venue} disabled="disabled"/>
                </label>
                <label>
                    Venue Id:
                    <input type="text" value={venueId} disabled="disabled"/>
                </label>
                <label>
                    Email To:
                    <input type="text" onChange={e=>this.email=e.target.value} value={this.email}/>
                </label>
                <label>
                    Message:
                    <textarea onChange={e=>this.message=e.target.value}>

                    </textarea>
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }

}