import React, {Component} from 'react';
import {Card, Nav} from 'react-bootstrap';
import axios from 'axios';

import Fishers from './Fishers/Fishers';
import Statistics from './Statistics/Statistics';

import ManagementStore from "../../stores/ManagementStore";
import ManagementAction from "../../actions/ManagementAction";

class Management extends Component {

    state = {
        fishers: [
            { id: 1,
            contact: {
                tel: "0640030303",
                name: "name",
                address: {
                    zipCode: 11223,
                    street: "street",
                    city: "city",
                    houseNumber: 23
                }
            } },
            { id: 2,
                contact: {
                tel: "12314",
                name: "name22",
                address: {
                    zipCode: 22222,
                    street: "street2",
                    city: "city2",
                    houseNumber: 2322
                }
            } }
        ],
        card: "fishermans"
    }

    onChangeOfFishermans = () =>{
        console.log("fishermans in onchangeof");
        console.log(ManagementStore._fishermans);
        this.setState({
            fishers : ManagementStore._fishermans
        });
    }

    componentWillUnmount() {
        ManagementStore.removeChangeListener(this.onChangeOfFishermans);
        
    }

    componentDidMount() {
        ManagementStore.addChangeListener(this.onChangeOfFishermans);
        ManagementAction.getFishermans();
    }
    
    render(){

        let card = (
            <Fishers fishers={this.state.fishers}/>
        );
        if(this.state.card==='statistics') {
            card = (
                <Statistics/>
            );
        }

        return(
            <Card>
                <Card.Header>
                    <Nav variant="tabs" defaultActiveKey="#first">
                    <Nav.Item>
                        <Nav.Link active={this.state.card==="fishermans"? true:false}
                                onClick={() => {this.setState({card: "fishermans"})}} >Fishermans</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link active={this.state.card==="statistics"? true:false}
                                onClick={() => {this.setState({card: "statistics"})}}>Statistics</Nav.Link>
                    </Nav.Item>
                    </Nav>
                    <Card.Body>
                        {card}
                    </Card.Body>                        
                </Card.Header>           
            </Card>
        );
    };
}

export default Management;