import React, {Component, Fragment} from 'react';
import {Nav, Card} from 'react-bootstrap';
import axios from 'axios';

import AboutMe from './AboutMe/AboutMe';
import Catches from './Catches/Catches';
import Authenticate from '../Authenticate/Authenticate';

import CatchesStore from "../../stores/CatchesStore";
import CatchesAction from "../../actions/CatchesAction";

class Fisherman extends Component {

    state = {
        fisherman: null,
        catches: [],
        showForm: false,
        catch: {
            timestamp: "timestamp",
            location: "",
            weight: "",
            species: ""
        },
        validation: {
            location: false,
            weight: false,
            species: false
        },
        card: "aboutme",
        fishermanId: null,
        firstRender: true
    }

    onChangeOfCatches = () =>{
        console.log("catches in onchangeof");
        console.log(CatchesStore._catches);
        this.setState({
            catches : CatchesStore._catches
        });
    }

    onChangeOfFisherman = () =>{
        console.log("fisherman in onchangeof");
        console.log(CatchesStore._fisherman);
        this.setState({
            fisherman : CatchesStore._fisherman
        });
    }

    componentWillUnmount() {
        CatchesStore.removeChangeListener(this.onChangeOfCatches);
        CatchesStore.removeChangeListener(this.onChangeOfFisherman)
    }

    componentDidMount() {
        CatchesStore.addChangeListener(this.onChangeOfCatches);
        CatchesStore.addChangeListener(this.onChangeOfFisherman);
        
    }

    handleCatchSave = () => {
        console.log("catch:");
        console.log(this.state.catch);
        const fishCatch = {...this.state.catch};
        console.log("fishCatch");
        console.log(fishCatch);
        let validation = {
            location: false,
            weight: false,
            species: false
        };
        let showForm = false;

        if(fishCatch.location.trim().length===0) {
            validation.location = true;
            showForm = true;
        } else {
            validation.location = false;
        }

        if(fishCatch.species.trim().length===0){
            validation.species = true;
            showForm = true;
        } else {
            validation.species = false;
        }

        if(fishCatch.weight.trim().length===0){
            validation.weight = true;
            showForm = true;
        } else {
            validation.weight = false;
        }

        if(!showForm) {
            fishCatch.fishermanId = this.state.fishermanId;
            fishCatch.timestamp = new Date().getFullYear()+"-"+new Date().getMonth()+"-"+new Date().getDay();
            CatchesAction.addCatche(fishCatch);
            this.setState({
                validation: validation,
                showForm: showForm
            });
        } else {
            this.setState({
                validation: validation,
                showForm: showForm
            });
        }
    }

    handleCatchClose = () => {
        const fishCatch = {
            timestamp: null,
            location: "",
            weight: "",
            species: ""
        }

        this.setState({
            showForm: false,
            catch: fishCatch,
            validation: {
                location: false,
                weight: false,
                species: false
            }
        });
    }

    handleNewCatch = () => {
        this.setState({showForm: true});
    }

    weightOnChange = (event) => {
        let fishCatch = {...this.state.catch};
        fishCatch.weight = event.target.value;
        this.setState({catch: fishCatch});
    }

    speciesOnChange = (event) => {
        let fishCatch = {...this.state.catch};
        fishCatch.species = event.target.value;
        this.setState({catch: fishCatch});
    }

    locationOnChange = (event) => {
        let fishCatch = {...this.state.catch};
        fishCatch.location = event.target.value;
        this.setState({catch: fishCatch});
    }

    fishermanIdOnChange = (event) => {
        this.setState({fishermanId: event.target.value});
    }

    fetchFishermanHandler = () => {
        this.state.firstRender = false;
        CatchesAction.getFishermanAndCatches(this.state.fishermanId);
        
    }

    render() {
        console.log("fisherman in render");
        console.log(this.state.fisherman);
        let content = null;
        if(this.state.fisherman !== null) {
            let card = (
                <AboutMe fisherman={this.state.fisherman}/>
            );

            if(this.state.card==='catches') {
                console.log("catches: "+this.state.card);
                card = (
                    <Catches
                        catches={this.state.catches}
                        handleNewCatch={() => this.handleNewCatch()}
                        showForm={this.state.showForm}
                        handleCatchClose={() => this.handleCatchClose()}
                        validation={this.state.validation}
                        handleCatchSave={() => this.handleCatchSave()}
                        speciesOnChange={(e) => this.speciesOnChange(e)}
                        timestampOnCanhe={(e) => this.timestampOnCanhe(e)}
                        locationOnChange={(e) => this.locationOnChange(e)}
                        weightOnChange={(e) => this.weightOnChange(e)}/>
                );
            }
            content = (
                <Card>
                    <Card.Header>
                        <Nav variant="tabs" defaultActiveKey="#first">
                        <Nav.Item>
                            <Nav.Link active={this.state.card==="aboutme"? true:false}
                                    onClick={() => {this.setState({card: "aboutme"})}} >About me</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link active={this.state.card==="catches"? true:false}
                                    onClick={() => {this.setState({card: "catches"})}}>Catches</Nav.Link>
                        </Nav.Item>
                        </Nav>
                        <Card.Body>
                            {card}
                        </Card.Body>                        
                    </Card.Header>           
                </Card>
            );
        } else {
            content = <Authenticate 
            fishermanIdOnChange={(e) => this.fishermanIdOnChange(e)}
            fetchFishermanHandler={() => this.fetchFishermanHandler()}
            exists={this.state.fisherman === null && !this.state.firstRender}/>
        }
        

        return (
            <Fragment>
                {content}
            </Fragment>
            
        );
    };
        
}

export default Fisherman;