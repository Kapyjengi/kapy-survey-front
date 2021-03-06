import React, { useEffect, useState } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import ShowQuestionsButton from './ShowQuestionsButton';
import ShowAnswersButton from './ShowAnswersButton';
import Questions from './Questions';
import Answerlist from './Answerlist';


export default function Surveylist() {

  const [survey, setSurvey] = useState([]);
  const [questionPattern, setQuestionPattern] = useState([]);
  const [surveyId, setSurveyId] = useState([]);
  const [surveyName, setSurveyName] = useState([]);
  const [surveyDescription, setSurveyDescription] = useState([]);
  const [answers, setAnwers] = useState([]);
  const [showQs, setShowQs] = useState(0);

  useEffect(() => {
    getSurveys();
  }, [])

  const getSurveys = () => {
    fetch('https://kapysurvey-back.herokuapp.com/surveys')
      .then(response => response.json())
      .then(data => setSurvey(data))
      .catch(err => console.error(err))
  }

  const showQuestions = (id, surveyname, surveydescription) => {
    setSurveyId(id);
    setSurveyName(surveyname)
    setSurveyDescription(surveydescription)

    fetch('https://kapysurvey-back.herokuapp.com/surveys/' + id)
      .then(response => response.json())
      .then(data => setQuestionPattern(data.questions))
      .catch(err => console.error(err))
  }

  const showAnswers = (id, surveyname, surveydescription) => {
    setSurveyId(id);
    setSurveyName(surveyname)
    setSurveyDescription(surveydescription)
    setShowQs(1)

    fetch('https://kapysurvey-back.herokuapp.com/surveys/' + id)
      .then(response => response.json())
      .then(data => setQuestionPattern(data.questions))
      .catch(err => console.error(err))
  
  }

  const columns = [
    {
      Header: 'Survey name',
      accessor: 'surveyName'
    },
    {
      Header: 'Survey description',
      accessor: 'surveyDescription'
    },
    {
      Cell: row => (<ShowQuestionsButton data={row.original} showQuestions={showQuestions} />),
      minWidth: 60
    },
    {
      Cell: row => (<ShowAnswersButton data={row.original} showAnswers={showAnswers} />),
      minWidth: 60
    },
  ]

   
  if (showQs!==0 && questionPattern !=="") {
    return (
      <div>
        <Answerlist surveyId={surveyId} surveyName={surveyName} surveyDescription={surveyDescription}/> 
      </div>
    )
  }
  // Sovellus ei toimi, jos ehtolauseeseen lisää kolmannen "=" merkin.
  // Nyt vertaillaan sitä, onko questionPattern state tyhjä vai ei
  // Kolmas "=" merkki vertailee tyhjyyden lisäksi tietotyyppejä.
  if (questionPattern == "") {
    return (
      <div>
        <ReactTable style={{ marginTop: 50 }} defaultPageSize={10} filterable={true} data={survey} columns={columns} />
      </div>
    );
  } 
  
  if (questionPattern !== "") {
    return (
      <div>
        <Questions surveyId={surveyId} surveyName={surveyName} surveyDescription={surveyDescription}/>
      </div>
    )
  }
  
  
}