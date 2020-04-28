import React from 'react';

const fisher = (props) => (
    <tr>
        <td>{props.fisher.id}</td>
        <td>{props.fisher.contact.name}</td>
        <td>{props.fisher.contact.tel}</td>
        <td>{props.fisher.contact.address.zipCode}</td>
        <td>{props.fisher.contact.address.city}</td>
        <td>{props.fisher.contact.address.street}</td>
        <td>{props.fisher.contact.address.houseNumber}</td>
    </tr>
);

export default fisher;