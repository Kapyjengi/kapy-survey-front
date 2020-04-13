import React, { useEffect, useState } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Showsurveyquestion from './Showsurveyquestion';
import Questionlist from './Questionlist';

export default function Surveylist() {

  const [survey, setSurvey] = useState([]);
  const [questionpattern, setQuestionpattern] = useState([]);

  useEffect(() => {
    getSurveys();
  }, [])

  const getSurveys = () => {

    fetch('https://kapysurvey-back.herokuapp.com/surveys')
      .then(response => response.json())
      .then(data => setSurvey(data))
      .catch(err => console.error(err))
  }

  const showQuestions = (id) => {
    fetch('https://kapysurvey-back.herokuapp.com/surveys/' + id)
      .then(response => response.json())
      .then(data => setQuestionpattern(data))
      .catch(err => console.error(err))

  }

  const columns = [
    {
      Cell: row => (<Showsurveyquestion data={row.original} showQuestions={showQuestions} />)
    },
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

  if (questionpattern == "") {
    return (
      <div>
        <h1> </h1>
        <ReactTable defaultPageSize={10} filterable={true} data={survey} columns={columns} />
      </div>
    );
  } else {
    return (
      <div>
        <Questionlist survey={questionpattern} getSurveys={getSurveys} />
      </div>
    )
  }
}