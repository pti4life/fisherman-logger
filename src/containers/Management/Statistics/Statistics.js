import React, {Component, Fragment} from 'react';
import axios from 'axios';

import ManagementStore from "../../../stores/ManagementStore";
import ManagementAction from "../../../actions/ManagementAction";

class Statistics extends Component {

    state = {
        lastMonth: 0
    };

    onChangeOfnumOfCatches = () =>{
        this.setState({
            lastMonth : ManagementStore._actualMonthNumberOfCatches
        });
    }

    componentWillUnmount() {
        ManagementStore.removeChangeListener(this.onChangeOfnumOfCatches);
        
    }

    componentDidMount() {
        ManagementStore.addChangeListener(this.onChangeOfnumOfCatches);
        ManagementAction.getNumberOfCatchesByActualMonth();
    }

    componentWillMount() {
        
    }
    
    render() {
        return(
            <Fragment>
                <b>Actual month catches: </b>{this.state.lastMonth}
            </Fragment>
        );
    }
}

export default Statistics;