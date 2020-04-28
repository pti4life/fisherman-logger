import React, {Component} from 'react';
import {Card, Nav} from 'react-bootstrap';
import axios from 'axios';

import Fishers from './Fishers/Fishers';
import Statistics from './Statistics/Statistics';

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

    componentWillMount() {
        axios.get('http://localhost:3001/fishermans')
            .then((response)=>{
                console.log(response.data);
                this.setState({fishers: response.data});
            })
            .catch((err)=>{
                console.log('problem\n'+err);
            });
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