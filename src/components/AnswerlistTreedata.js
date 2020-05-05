import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';


export default function ShowAnswerlistTreeData(props) {
    const [list, setList] = useState([]);

    useEffect(() => {
        getQuestionList();

    }, [])

    const getQuestionList = () => {
        fetch('https://kapysurvey-back.herokuapp.com/surveys/' +props.surveyId + '/questions')
            .then(response => response.json())
            .then(data => setList(data))
            .catch(err => console.error(err))
    }
console.log(list)
    return (
        <div>
            <MaterialTable
                style={{ marginTop: 50, marginLeft: 10, marginRight: 10 }}
                title={props.surveyName}
                data={list}
                  columns={[
                    { title: 'questionId', field: 'questionId' },
                    { title: 'Question', field: 'questionText' },
                    { title: 'answerId', field: 'answers[0].answerId' },
                    { title: 'answerText', field: 'answers[0].answerText' },
                  ]}
                  parentChildData={(row, rows) => rows.find(a => a.questionId === row.answerId)}
                  options={{
                    selection: true,
                  }}
                />
                </div>
              )
            }
          