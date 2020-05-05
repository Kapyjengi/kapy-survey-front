/* import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';


export default function ShowAnswerlistTreeData(props) {
    const [list, setList] = useState([]);

    useEffect(() => {
        getQuestionList();

    }, [])

    const getQuestionList = () => {
        fetch('https://kapysurvey-back.herokuapp.com/surveys/' +4 + '/questions')
            .then(response => response.json())
            .then(data => setList(data))
            .catch(err => console.error(err))
    }

    return (
        <div>
            <MaterialTable
                style={{ marginTop: 50, marginLeft: 10, marginRight: 10 }}
                title={props.surveyName}
                data={[

                    {
                        questionId: 6,
                        questionText: 'f',
                    },
                    {
                        answerId: 6,
                        answerText: 5,
                        parentId: 6 
                    },
                    {
                        questionId: 5,
                        questionText: 'a',
                    },
                    {
                        answerId: 7,
                        answerText: 6,
                        parentId: 5 
                    }
                ]}
                    columns={[
                        { title: 'Id', field: 'questionId' },
                        { title: 'Question', field: 'questionText' },
                        { title: 'Survey', field: 'surveyName' },
                      ]}
                parentChildData={(row, rows) => rows.find(question => question.questionId === row.parentId)}
                options={{
                    selection: true,
                }}
            />
        </div>
    )
} */