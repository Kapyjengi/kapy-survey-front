import React from 'react';
import Button from '@material-ui/core/Button';

export default function ShowsurveyAnswers(props) {

  const handleClickOpen = () => {

    props.showAnswers(props.data.surveyId, props.data.surveyName, props.data.surveyDescription)
  }

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        Show answers
      </Button>
    </div>
  )
}