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

        fetch('https://kapysurvey-back.herokuapp.com/surveys')
            .then(response => response.json())
            .then(data => setSurvey(data))
            .catch(err => console.error(err))
    }

   

    const columns = [
        
        {
            Header: 'Id',
            accessor: 'surveyId'
            
        },
        {
            Header: 'Survey name',
            accessor: 'surveyName'
        },
        {
            Header: 'Survey description',
            accessor: 'surveyDescription'
        }
        
    ]

    return (
        <div>
            <h1> </h1>
          <ReactTable defaultPageSize={10} filterable={true} data={survey} columns={columns} />
     
        </div>
    );
}