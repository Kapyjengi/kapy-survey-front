import React from 'react';
import Button from '@material-ui/core/Button';

export default function Showsurveyquestion(props) {

  const handleClickOpen = () => {

    props.showQuestions(props.data.surveyId, props.data.surveyName, props.data.surveyDescription)
  }

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        Show questions
      </Button>
    </div>
  )
}