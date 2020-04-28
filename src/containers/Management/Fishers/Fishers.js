import React from 'react';

import Fisher from './Fisher/Fisher';
import {Table} from 'react-bootstrap';

const fishers = (props) => {
    return(
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Telephone</th>
                    <th>Zip code</th>
                    <th>City</th>
                    <th>Street</th>
                    <th>house number</th>
                </tr>
            </thead>
            <tbody>
            {
                props.fishers.map((fisher)=>{
                    return(
                        <Fisher
                            fisher={fisher}
                        />
                    );
                })
            }
            </tbody>
        </Table>
    );
}

export default fishers;