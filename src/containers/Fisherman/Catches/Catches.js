import React, {Fragment} from 'react';

import Catch from './Catch/Catch';
import {Button, Table, Modal, Form} from 'react-bootstrap';

const catches = (props) => {    

    return(
        <Fragment>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>timestamp</th>
                        <th>location</th>
                        <th>weight</th>
                        <th>species</th>
                    </tr>
                </thead>
                <tbody>
                {
                    props.catches.map((fishCatch)=>{
                        return(
                            <Catch
                                catch={fishCatch}
                            />
                        );
                    })
                }
                </tbody>
            </Table>
            <Button variant="primary" onClick={props.handleNewCatch}>New Catch</Button>
            <Modal show={props.showForm} onHide={props.handleCatchClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>New Catch</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>location</Form.Label>
                            <Form.Control isInvalid={props.validation.location} type="text" onChange={props.locationOnChange} placeholder="location" />
                            <Form.Control.Feedback type="invalid">Required field</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>weight</Form.Label>
                            <Form.Control isInvalid={props.validation.weight} type="number" onChange={props.weightOnChange} placeholder="weight" />
                            <Form.Control.Feedback type="invalid">Required field</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>species</Form.Label>
                            <Form.Control isInvalid={props.validation.species} type="text" onChange={props.speciesOnChange} placeholder="species" />
                            <Form.Control.Feedback type="invalid">Required field</Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleCatchClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={props.handleCatchSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
}

export default catches;