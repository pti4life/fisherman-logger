import React, {Component, Fragment} from 'react';

import {Button, Modal, Form} from 'react-bootstrap';

class Authenticate extends Component {
  
    render () {
        return (
            <Fragment>    
                <Modal.Dialog show="true" backdrop="false">
                <Modal.Header closeButton>
                    <Modal.Title>Tell me who you are</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control 
                            type="number"
                            onChange={this.props.fishermanIdOnChange}
                            placeholder="Your identifier"
                            isInvalid={this.props.exists}/>
                        <Form.Control.Feedback type="invalid">Fisherman doesn't exists.</Form.Control.Feedback>
                    </Form.Group>               
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.props.fetchFishermanHandler}>
                        OK
                    </Button>
                </Modal.Footer>
                </Modal.Dialog>
            </Fragment>
        );
    } 
}

export default Authenticate;
