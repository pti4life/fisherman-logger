import dispatcher from '../AppDispatcher';

class CatchesAction {

    addCatches(catches){
        dispatcher.handleViewAction({
            command : 'ADD_CATCHES',
            catches : catches
        });
    }
}

export default new CatchesAction();
