import EventEmitter from 'events';
import dispatcher from '../AppDispatcher';

import axios from 'axios';

class CatchesStore extends EventEmitter{

    _catches = [];

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
const store = new CatchesStore();

dispatcher.register((action) =>{
    if(action.payload.command === 'ADD_CATCHES'){
        console.log("payload item");
        console.log(action.payload.catches);
        store._catches = [...action.payload.catches];
        console.log("catches in store");
        console.log(store._catches);
        store.emitChange();
    }
});

dispatcher.register((action) =>{
    if(action.payload.command === 'ADD_CATCHE'){
        let fishCatch = action.payload.fishCatch;
        axios.post("/catches",fishCatch)
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            })
        console.log("fishcatch in catchesstore");
        console.log(fishCatch);
        store._catches.push(action.payload.fishCatch);
        store.emitChange();
    }
});

dispatcher.register((action) =>{
    if(action.payload.command === 'GET_FISHERMAN_AND_CATCHES'){
        axios.get('/fishermans?id='+action.payload.userId)
            .then((response)=>{
                console.log("response data");
                console.log(response.data);
                if(response.data.length !== 1) {
                    store._fisherman = null;
                    store.emitChange();
                } else {
                    store._fisherman = response.data[0]; 
                    
                    axios.get('/catches?fishermanId='+action.payload.userId)
                        .then((cacthesResponse)=>{
                            store._catches = cacthesResponse.data;
                            store.emitChange();
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
});


export default store;
