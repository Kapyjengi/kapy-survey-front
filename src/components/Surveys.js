import React, { useEffect, useState } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import ShowQuestionsButton from './ShowQuestionsButton';
import Questions from './Questions';

export default function Surveylist() {

  const [survey, setSurvey] = useState([]);
  const [questionPattern, setQuestionPattern] = useState([]);
  const [surveyId, setSurveyId] = useState([]);
  const [surveyName, setSurveyName] = useState([]);

  useEffect(() => {
    getSurveys();
  }, [])

  const getSurveys = () => {
    fetch('https://kapysurvey-back.herokuapp.com/surveys')
      .then(response => response.json())
      .then(data => setSurvey(data))
      .catch(err => console.error(err))
  }


  const showQuestions = (id, surveyname) => {
    setSurveyId(id);
    setSurveyName(surveyname)

    fetch('https://kapysurvey-back.herokuapp.com/surveys/' + id)
      .then(response => response.json())
      .then(data => setQuestionPattern(data))
      .catch(err => console.error(err))
  }

  const columns = [
    {
      Header: 'Survey id',
      accessor: 'surveyId'

    },
    {
      Header: 'Survey name',
      accessor: 'surveyName'
    },
    {
      Header: 'Survey description',
      accessor: 'surveyDescription'
    },
    {
      Cell: row => (<ShowQuestionsButton data={row.original} showQuestions={showQuestions} />)
    }
  ]

  // Sovellus ei toimi, jos ehtolauseeseen lisää kolmannen "=" merkin.
  // Nyt vertaillaan sitä, onko questionPattern state tyhjä vai ei
  // Kolmas "=" merkki vertailee tyhjyyden lisäksi tietotyyppejä. 
  if (questionPattern == "") {
    return (
      <div>
        <h1> </h1>
        <ReactTable defaultPageSize={10} filterable={true} data={survey} columns={columns} />
      </div>
    );
  } else {
    return (
      <div>
        <Questions surveyId={surveyId} surveyName={surveyName} />
      </div>
    )
  }
}