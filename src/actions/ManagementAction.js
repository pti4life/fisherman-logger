import dispatcher from '../AppDispatcher';

class ManagementAction {

    getFishermans(){
        dispatcher.handleViewAction({
            command : 'GET_FISHERMANS'
        });
    }

    getNumberOfCatchesByActualMonth(){
        dispatcher.handleViewAction({
            command : 'GET_NUM_OF_CATCHES'
        });
    }
}

export default new ManagementAction();