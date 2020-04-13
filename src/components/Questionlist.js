import React, { useEffect, useState } from 'react';


export default function Questionlist(props) {

    const itemRows = props.survey.questions.map((questions) =>
        <tr key={questions.questionId}>
            <td>{'('+questions.questionId+')'}</td>
            <td>#</td>
            <td>{questions.questionText}</td>
            <td>#</td>
        </tr>
    )

    return (
        <div><div><br></br> </div>
            <h1>{props.survey.surveyName}'s Questions</h1>

            <table>
                <tbody>
                    <tr><th>Id</th><th></th><th>Question</th></tr>
                    {itemRows}
                </tbody>
            </table>
         
        </div>
    );
}



   

   

    
    
    