import React, { useEffect, useState } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Answer from './Answer'
import Button from '@material-ui/core/Button';



export default function Questionlist(props) {

    const [question, setQuestion] = useState([]);
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        getQuestion();
    }, [])

    const getQuestion = () => {
        fetch('https://kapysurvey-back.herokuapp.com/surveys/' + props.surveyId)
            .then(response => response.json())
            .then(data => setQuestion(data.questions))
            .catch(err => console.error(err))

    }

    const columns = [
        {
            Header: 'Id',
            accessor: 'questionId'
        },
        {
            Header: 'Question',
            accessor: 'questionText'
        }
    ]

    const answerToQuestions = () => {
        setDisplay(1)
    }

    if (display === 0) {

        return (
            <div>
                <h3>täytettä</h3>
                <h1>{props.surveyName}</h1>
                <Button color="primary"onClick={() => answerToQuestions()}>Answer to questions</Button>
                <ReactTable
                    defaultPageSize={10}
                    filterable={true}
                    data={question}
                    columns={columns}
                />
            </div>
        )

    } else {

        return (
            <div>
                <Answer surveyId={props.surveyId} surveyName={props.surveyName} />

            </div>
        );
    }
}