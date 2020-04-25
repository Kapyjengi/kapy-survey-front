import React, { useEffect, useState } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Answer from './Answer'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
                <Typography style={{ marginTop: 50, marginBottom: 10 }} gutterBottom variant="h5" component="h2"> {props.surveyDescription} </Typography>
                <Typography style={{ marginBottom: 5 }} gutterBottom variant="h6" component="h2"> {props.surveyName} </Typography>
                <Button color="primary"onClick={() => answerToQuestions()}>Take part in the survey</Button>
                <ReactTable
                    style={{ marginTop: 10 }}    
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