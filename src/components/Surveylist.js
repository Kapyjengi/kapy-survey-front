import React, { useEffect, useState } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button'
import SnackBar from '@material-ui/core/Snackbar'

export default function Surveylist() {
    
    const [survey, setSurvey] = useState([]);

    useEffect(() => {
        getSurveys();
    }, [])

    const getSurveys = () => {

        fetch('https://kapysurvey.herokuapp.com/surveys')
            .then(response => response.json())
            .then(data => setSurvey(data))
            .catch(err => console.log(err))
    }

    const columns = [
        
        {
            Header: 'Id',
            accessor: 'survey.surveyId'
        },
        {
            Header: 'Survey name',
            accessor: 'survey.surveyName'
        },
        {
            Header: 'Survey description',
            accessor: 'survey.surveyDescpription'
        }
        
    ]

    return (
        <div>
            <h1> </h1>
            <ReactTable defaultPageSize={10} filterable={true} data={survey} columns={columns} />
        </div>
    );
}