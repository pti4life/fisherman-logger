import React, {Component, Fragment} from 'react';
import axios from 'axios';

class Statistics extends Component {

    state = {
        lastMonth: 0
    };

    componentWillMount() {
        axios.get('http://localhost:3001/catches')
            .then((response)=>{
                const numberOfCatches = response.data.reduce((total, current)=>{
                        const date = current.timestamp;
                        const startSubstr = date.indexOf("-")+1;
                        let month = date.substring(startSubstr,date.indexOf("-",startSubstr));
                        console.log("date "+new Date().getMonth());
                        console.log("month: "+month);
                        if(month === new Date().getMonth().toString()) {
                            console.log("tesa");
                            return ++total;
                        } else {
                            return total;
                        }
                    } ,0);
                    console.log("nmberofcatches"+numberOfCatches)
                    this.setState({lastMonth: numberOfCatches});

            })
            .catch((err)=>{
                console.log('problem\n'+err)
            });
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