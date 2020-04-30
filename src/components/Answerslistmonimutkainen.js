import React, { useEffect, useState } from 'react';
import 'react-table-v6/react-table.css';

import List from './List'

export default function Beepboop(props) {

    let vastaus = [];

    const testi = () => {
        //    console.log(props.answers)

        for (let i = 0; i < props.answers.length; i++) {
            for (let x = 0; x < props.questions.length; x++) {
                if (props.answers[i].question.questionId == props.questions[x].questionId) {
                    vastaus.push({ kysymys: props.questions[x].questionText, vastaus: props.answers[i].answerText, qid: props.questions[x].questionId, aid: props.answers[i].answerId })
                    //console.log("kysymys: "+ props.questions[x].questionText + " vastaus:" + props.answers[i].answerText)
                }
            }
        }
    

    let xx=[];
    for (let i = 0; i < vastaus.length; i++) {
        let iidee = vastaus[i].qid  
        
    
    for (let x = props.questions.length; x < vastaus.length; x++) {
        let iidee2 = vastaus[x].aid
        
        if (vastaus[x].qid === iidee && !xx.includes(iidee2)) {
            vastaus[i].vastaus=vastaus[i].vastaus + vastaus[x].vastaus
            xx.push(iidee2)
        }

    }

    console.log(vastaus)
    //console.log(xx)
}
for (let i = vastaus.length-props.questions.length; i < vastaus.length; i++) {
    //console.log(props.questions.length + vastaus.length)
    vastaus.pop();

} 

    }
    testi();
    return (
        <div>
            <h1 style={{ marginTop: 50 }}>{props.surveyName}'s answers</h1>
            <h3>{props.surveyDescription}</h3>
            <List vastaus={vastaus} />
        </div>
    )
}