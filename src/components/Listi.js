import React from 'react';


export default function listi(props) {

    return (
        <div>
            {props.vastaus.map((vasta, i) => <ul key={i}><strong>{vasta.kysymys}</strong><ul>{vasta.vastaus}</ul>
            </ul>)}
        </div>
    )

}