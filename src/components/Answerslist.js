import React, { useEffect, useState } from 'react';
import 'react-table-v6/react-table.css';

import List from './List'

export default function AnswersList(props) {
    // lista kysymyksiä, joiden alla vastauksia
    let vastaus = [];

    // 
    const testi = () => {
        //    console.log(props.answers)
        // käydään läpi vastaukset
        for (let i = 0; i < props.answers.length; i++) {
            // käydään kysymykset läpi
            for (let x = 0; x < props.questions.length; x++) {
                // jos vastauksen kysymysID on sama kuin kysymyksen kysymysID, niin vastaus-arrayhin pushataan olio, jossa on kysymys ja vastaukset
                if (props.answers[i].question.questionId == props.questions[x].questionId) {
                    vastaus.push({ kysymys: props.questions[x].questionText, vastaus: props.answers[i].answerText, qid: props.questions[x].questionId, aid: props.answers[i].answerId })
                    //console.log("kysymys: "+ props.questions[x].questionText + " vastaus:" + props.answers[i].answerText)
                }
            }
        }
    
    // sisältää vastaus-idt, jotka on käyty läpi
    let xx=[];
    
    // Järjestetään vastaukset kyselyihin
    // kysymykset näkyy vaan kerran, kaikki vastaukset kysymykseen kysymyksen alla
    
    
    for (let i = 0; i < vastaus.length; i++) {
        let iidee = vastaus[i].qid  
        
    
    for (let x = props.questions.length; x < vastaus.length; x++) {
        let iidee2 = vastaus[x].aid
        
        // iidee2 = vastausid
        // jotta sama vastaus ei tulisi kahteen kertaan, tar
        if (vastaus[x].qid === iidee && !xx.includes(iidee2)) {
            // vastauskenttään lisätään uusi vastaus stringinä
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