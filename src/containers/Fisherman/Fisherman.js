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
        fisherman: {
            equipment: "equipment, equipment, equipment",
            baits: "baits baits baits baitzs",
            techniques: "techniques, techniques",
            poles: "poles poles poles"
        },
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

        authenticated: false,
        fishermanId: null,
        exists: null
    }

    onChangeOfCatches = () =>{
        console.log("in change catches");
        console.log(CatchesStore._catches);
        this.setState({
            catches : CatchesStore._catches
        });
    }

    componentWillUnmount() {
        CatchesStore.removeChangeListener(this.onChangeOfCatches)
    }

    componentDidMount() {
        CatchesStore.addChangeListener(this.onChangeOfCatches);
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

        const catches = [...this.state.catches, fishCatch];
        console.log("validation");
        console.log(validation);
        if(!showForm) {
            fishCatch.fishermanId = this.state.fishermanId;
            fishCatch.timestamp = new Date().getFullYear()+"-"+new Date().getMonth()+"-"+new Date().getDay();
            axios.post("http://localhost:3001/catches",fishCatch)
                .then((response) => {
                    console.log(response);
                })
                .catch((err) => {
                    console.log(err);
                })
            this.setState({
                validation: validation,
                showForm: showForm,
                catches: catches
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
        axios.get('http://localhost:3001/fishermans?id='+this.state.fishermanId)
            .then((response)=>{
                console.log("response data");
                console.log(response.data);
                if(response.data.length !== 1) {
                    this.setState({exists: true});
                } else {
                    this.setState({exists: false, authenticated:true, fisherman:response.data[0]});
                    axios.get('http://localhost:3001/catches?fishermanId='+this.state.fishermanId)
                        .then((cacthesResponse)=>{
                            CatchesAction.addCatches(cacthesResponse.data);
                        })
                        .catch((catchesErr)=>{
                            console.log('problem\n'+catchesErr)
                        });
                }
            })
            .catch((err)=>{
                console.log('problem\n'+err)
            });
        
    }

    render() {
        let content = null;
        if(this.state.authenticated) {
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
            exists={this.state.exists}/>
        }
        

        return (
            <Fragment>
                {content}
            </Fragment>
            
        );
    };
        
}

export default Fisherman;