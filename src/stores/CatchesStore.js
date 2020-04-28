import EventEmitter from 'events';
import dispatcher from '../AppDispatcher';

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


export default store;
