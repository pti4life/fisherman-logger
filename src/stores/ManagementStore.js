import EventEmitter from 'events';
import dispatcher from '../AppDispatcher';

import axios from 'axios';

class ManagementStore extends EventEmitter{

    _fishermans = [];

    _actualMonthNumberOfCatches = null;

    emitChange(){
        this.emit('Change');
    }

    addChangeListener(callback){
        this.on('Change', callback);
    }

    removeChangeListener(callback){
        this.removeListener('Change', callback);
    }
}
const store = new ManagementStore();

dispatcher.register((action) =>{
    if(action.payload.command === 'GET_FISHERMANS'){
        axios.get('/fishermans')
            .then((response)=>{
                store._fishermans = response.data;
                store.emitChange();
            })
            .catch((err)=>{
                console.log('problem\n'+err);
            });
    }
});

dispatcher.register((action) =>{
    if(action.payload.command === 'GET_NUM_OF_CATCHES'){
        axios.get('/catches')
            .then((response)=>{
                const numberOfCatches = response.data.reduce((total, current)=>{
                        const date = current.timestamp;
                        console.log("date konstants");
                        console.log(date);
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
                    store._actualMonthNumberOfCatches = numberOfCatches;
                    store.emitChange();
            })
            .catch((err)=>{
                console.log('problem\n'+err)
            });
    }
});



export default store;
