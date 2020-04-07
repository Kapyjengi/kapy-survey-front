import React, { useEffect, useState } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button'
import SnackBar from '@material-ui/core/Snackbar'

export default function Questionlist() {
    
    const [question, setQuestion] = useState([]);

    useEffect(() => {
        getQuestions();
    }, [])

    const getQuestions = () => {

        fetch('https://kapysurvey-back.herokuapp.com/surveys/')
            .then(response => response.json())
            .then(data => setQuestion(data))
            .catch(err => console.log(err))
    }

    const columns = [
        {
            Header: 'Id',
            accessor: 'questionId'
        },
        {
            Header: 'Question',
            accessor: 'questionText'
        },
        {
            Header: 'Survey name',
            accessor: 'survey.surveyName'
        }
    ]

    return (
        <div>
            <h1> </h1>
            <ReactTable defaultPageSize={10} filterable={true} data={question} columns={columns} />
        </div>
    );
}