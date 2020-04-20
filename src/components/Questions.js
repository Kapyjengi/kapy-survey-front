import React, { useEffect, useState } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';

export default function Questionlist(props) {

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        getQuestions();
    }, [])

    const getQuestions = () => {
        fetch('https://kapysurvey-back.herokuapp.com/surveys/' + props.surveyId)
            .then(response => response.json())
            .then(data => setQuestions(data.questions))
            .catch(err => console.error(err))
    }

    const columns = [
        {
            Header: 'Id',
            accessor: 'questionId'
        },
        {
            Header: 'Survey name',
            accessor: 'questionText'
        }
    ]

    return (
        <div>
            <h1>asdf</h1>
            <ReactTable
                defaultPageSize={10}
                filterable={true}
                data={questions}
                columns={columns}
            />
        </div>
    );
}