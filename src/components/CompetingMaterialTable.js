import React, { useState } from 'react';
import MaterialTable from 'material-table'

// as prop get surveyId
export default function CompetingMaterialTable(props) {
    const [list, setList] = useState([])

    useEffect(() => {
        getAnswers();
    }, [])
    // https://kapysurvey-back.herokuapp.com/surveys/4/questions
    const getAnswers = () => {
        fetch('https://kapysurvey-back.herokuapp.com/surveys/' + props.surveyId + '/questions')
            .then(response => response.json())
            .then(data => setList(data.questions))
            .catch(err => console.error(err))
    }


    return (
        <div>


        </div>
    )


}