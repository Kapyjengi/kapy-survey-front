import React, { useEffect, useState } from 'react';
import 'react-table-v6/react-table.css';
import Listi from './Listi'


export default function AnswersList(props) {

    let vastaus = [];

    const testi = () => {
        //    console.log(props.answers)

        for (let i = 0; i < props.answers.length; i++) {
            for (let x = 0; x < props.questions.length; x++) {
                if (props.answers[i].question.questionId == props.questions[x].questionId) {
                    vastaus.push({ kysymys: props.questions[x].questionText, vastaus: props.answers[i].answerText })
                    //console.log("kysymys: "+ props.questions[x].questionText + " vastaus:" + props.answers[i].answerText)
                }
            }
        }
    }

    testi();
    return (
        <div>
            <h1 style={{ marginTop: 50 }}>{props.surveyName}'s answers</h1>
            <h3>{props.surveyDescription}</h3>
            <Listi vastaus={vastaus} />
        </div>
    )
}
