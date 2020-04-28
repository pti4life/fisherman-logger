import React, {Fragment} from 'react';

import {Card} from 'react-bootstrap';

const aboutMe = (props) => {
    return(
        <Fragment>
            <Card.Title>{props.fisherman.contact.name}</Card.Title>
            <Card.Text>
            <b>Equipment: </b>{props.fisherman.equipment}
            </Card.Text>
            <Card.Text>
            <b>baits: </b>{props.fisherman.baits}
            </Card.Text>
            <Card.Text>
            <b>techniques: </b>{props.fisherman.techniques}
            </Card.Text>
            <Card.Text>
            <b>poles: </b>{props.fisherman.poles}
            </Card.Text>
        </Fragment>
    );
};

export default aboutMe;