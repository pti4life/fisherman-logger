import dispatcher from '../AppDispatcher';

class CatchesAction {

    addCatches(catches){
        dispatcher.handleViewAction({
            command : 'ADD_CATCHES',
            catches : catches
        });
    }

    addCatche(fishCatch){
        dispatcher.handleViewAction({
            command : 'ADD_CATCHE',
            fishCatch : fishCatch
        });
    }

    getFishermanAndCatches(userId){
        dispatcher.handleViewAction({
            command : 'GET_FISHERMAN_AND_CATCHES',
            userId : userId
        });
    }
}

export default new CatchesAction();
