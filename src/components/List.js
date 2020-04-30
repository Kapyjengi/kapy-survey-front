import React from 'react';


export default function questionList(props) {
 //  console.log(props)
    
 return (
    <div>
        {props.vastaus.map((vasta, i) => <ul key={i}><strong>
            {vasta.kysymys}</strong><ul>{vasta.vastaus}</ul>
        </ul>)}
    </div>
)

}