import React, { useEffect, useState } from 'react';
import 'react-table-v6/react-table.css';
import ReactTable from 'react-table-v6';



export default function AnswersList(props) {

    let vastaus = [];
    let columns = []
    let xx = [];

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







        for (let i = 0; i < props.questions.length; i++) {
            let iidee = props.questions[i].questionId

            columns = [...columns,


            {
                Header: props.questions[i].questionText,
                Cell: d => {
                    d = "z"
                    for (let x = 0; x < vastaus.length; x++) {
                        let iidee2 = vastaus[x].aid
                        if (vastaus[x].qid === iidee && !xx.includes(iidee2)) {
                            d = d + vastaus[x].vastaus + "\n"
                            xx.push(iidee2)
                        }
                    }
                    return (d)
                }
            }
            ]
        }
        console.log(columns)


        console.log(vastaus)
    }
    testi();
    return (
        <div>
            <h1 style={{ marginTop: 50 }}>{props.surveyName}'s answers</h1>
            <h3>{props.surveyDescription}</h3>
            <ReactTable
                style={{ marginTop: 10 }}
                defaultPageSize={10}
                filterable={true}
                data={props.questions}
                columns={columns}
            />
        </div>
    )
}